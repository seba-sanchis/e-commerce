"use server";

import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import mercadopago from "mercadopago";
import { ObjectId } from "mongodb";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";

import { connectToDB } from "./database";
import { authOptions } from "./options";
import {
  Item as Items,
  Order as Orders,
  Payer as Payers,
  Payment as Payments,
  Phone as Phones,
  Picked as Pickeds,
  Sessions,
  Transaction as Transactions,
  UserProfile,
} from "@/common.types";
import Item from "@/models/item";
import Product from "@/models/product";
import User from "@/models/user";
import Order from "@/models/order";
import { env } from "@/constants";
import Payer from "@/models/payer";
import Payment from "@/models/payment";
import Picked from "@/models/picked";
import Transaction from "@/models/transaction";
import Phone from "@/models/phone";

const { MERCADOPAGO_TOKEN, MERCADOPAGO_URL } = env;

// Create a new user
export async function newUser(params: UserProfile) {
  const {
    firstName,
    lastName,
    dni,
    birthday,
    region,
    location,
    address,
    postcode,
    email,
    password,
    areaCode,
    phone,
  } = params;

  try {
    await connectToDB();

    //Validations
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters.");

    const userExists = await User.findOne({ email });

    if (userExists) throw new Error("Email already exists.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      dni,
      birthday,
      region,
      location,
      address,
      postcode,
      email,
      password: hashedPassword,
      areaCode,
      phone,
    });

    await newUser.save();
  } catch (error: any) {
    throw new Error(`Failed to create a new user: ${error.message}`);
  }
}

// Get products by category
export async function getProductsByCategory(params: string) {
  await connectToDB();

  const data = await Product.find({ category: params });

  return data;
}

// Get products by name
export async function getProductsByName(params: string) {
  await connectToDB();

  const data = await Product.find({ name: params });

  return data;
}

// Add products to bag
export async function addToBag(params: Items) {
  const session = (await getServerSession(authOptions)) as Sessions;

  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(session.user?.id).populate({
    path: "bag",
    populate: {
      path: "product", // Populate the product field within bag
      model: Product,
    },
  });

  const alreadyInBag = currentSession.bag.find(
    (bagItem: Items) =>
      bagItem.product._id?.toString() === params.product.toString()
  );

  if (alreadyInBag) {
    // Product already in bag, update the quantity
    alreadyInBag.quantity += params.quantity;

    await Item.findByIdAndUpdate(alreadyInBag._id, {
      quantity: alreadyInBag.quantity,
    });
  } else {
    // Product not in bag, add as a new item
    const newItem = new Item(params);

    await newItem.save();

    currentSession.bag = [...currentSession.bag, newItem];

    await currentSession.save();
  }
}

//Get bag items
export async function getItems(params: string) {
  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(params).populate({
    path: "bag",
    populate: {
      path: "product", // Populate the product field within bag
      model: Product,
      // select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });

  return currentSession;
}

//Update bag item
export async function updateItem(itemId: ObjectId, quantity: number) {
  try {
    await connectToDB();

    // Find the item to be updated
    await Item.findByIdAndUpdate(itemId, { quantity });
  } catch (error: any) {
    throw new Error(
      `Failed to delete item and update user's bag: ${error.message}`
    );
  }
}

//Remove bag item
export async function removeItem(itemId: ObjectId, userId: string) {
  try {
    await connectToDB();

    // Find the item to be deleted
    const deletedItem = await Item.findByIdAndRemove(itemId);

    if (!deletedItem) {
      throw new Error("Item not found");
    }

    // Find the user associated with the item
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Update the user's bag by removing the deleted item
    user.bag.pull(deletedItem._id); // Use Mongoose's pull method to remove the item from the bag array
    await user.save();
  } catch (error: any) {
    throw new Error(
      `Failed to delete item and update user's bag: ${error.message}`
    );
  }
}

// Payment gateway integration
export async function newCheckOut(
  params: PreferenceItem[],
  id: string,
  email: string,
  dni: number
) {
  // Agrega credenciales
  mercadopago.configure({
    access_token: MERCADOPAGO_TOKEN!,
  });

  try {
    const response = await mercadopago.preferences.create({
      items: params,
      notification_url: `${MERCADOPAGO_URL}/api/payment`,
      back_urls: {
        failure: `${MERCADOPAGO_URL}/bag`,
        pending: `${MERCADOPAGO_URL}/profile`,
        success: `${MERCADOPAGO_URL}/profile`,
      },
      payer: {
        email: email,
        identification: { type: "DNI", number: `${dni}` },
      },
      external_reference: id,
    });

    return response.body;
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
}

export async function newOrder(
  order: Orders,
  payer: Payers,
  payment: Payments,
  phone: Phones,
  picked: Pickeds[],
  transaction: Transactions
) {
  try {
    await connectToDB();

    // Create payer, payment, picked, and transaction subdocuments
    const newPayer = new Payer({
      ...payer,
      phone: phone ? new Phone(payer.phone) : undefined,
    });
    await newPayer.save();

    const newPayment = new Payment(payment);
    await newPayment.save();

    const newPicked = await Picked.create(picked);

    const newTransaction = new Transaction(transaction);
    await newTransaction.save();

    // Create and save the new order with associated subdocuments
    const newOrder = new Order({
      ...order,
      payer: newPayer._id,
      payment: newPayment._id,
      picked: newPicked.map((item: Pickeds) => item._id),
      transaction: newTransaction._id,
    });
    await newOrder.save();

    // Find the existing client by ID
    const currentSession = await User.findById(order.reference);

    // Update user's purchases
    currentSession.purchases.push(newOrder);

    // Delete items from the 'Item' collection
    const itemsToRemove = currentSession.bag.map((item: Items) => item._id);
    await Item.deleteMany({ _id: { $in: itemsToRemove } });

    // Clear user's bag
    currentSession.bag = [];

    // Save user session
    await currentSession.save();
  } catch (error: any) {
    throw new Error(`Failed to create a new order: ${error.message}`);
  }
}

// //Get orders
// export async function getOrders(params: string) {
//   await connectToDB();

//   // Find the existing client by ID
//   const currentSession = await User.findById(params).populate({
//     path: "purchases",
//     populate: {
//       path: "product", // Populate the product field within bag
//       model: Product,
//     },
//   });

//   return currentSession;
// }

// const session = await mongoose.startSession();
// session.startTransaction();

// await connectToDB();

// // Find the existing client by ID
// const currentSession = await User.findById(order.reference).session(
//   session
// );

// const newOrder = new Order(order);

// await newOrder.save({ session });

// currentSession.purchases.push(newOrder);

// const itemsToRemove = currentSession.bag.map((item: Items) => item._id);

// // Delete items from the 'Item' collection
// await Item.deleteMany({ _id: { $in: itemsToRemove } }, { session });

// currentSession.bag = [];

// await currentSession.save({ session });

// await session.commitTransaction();
