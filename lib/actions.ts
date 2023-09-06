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
  Product as Products,
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
import { startSession } from "mongoose";

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

// Update an user
export async function updateUser(params: UserProfile) {
  const {
    _id,
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

    // Find the existing client by ID
    const existingUser = await User.findById(_id);

    if (!existingUser) throw new Error("User not found");

    // Update the product with new data
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.dni = dni;
    existingUser.birthday = birthday;
    existingUser.region = region;
    existingUser.location = location;
    existingUser.address = address;
    existingUser.postcode = postcode;
    existingUser.email = email;

    if (password) {
      existingUser.password = password;
    }
    existingUser.areaCode = areaCode;
    existingUser.phone = phone;

    await existingUser.save();
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

// Get bestsellers products
export async function getBestsellers() {
  try {
    await connectToDB();

    const products = await Product.find().sort({ sold: -1 }).limit(4);

    return products;
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`); // Handle any errors
  }
}

// Get products by search
export async function getProductsBySearch(params: string) {
  try {
    await connectToDB();

    // Decode the URL-encoded string and split it into individual words
    const decodedParams = decodeURIComponent(params);
    const searchWords = decodedParams.trim().split(/\s+/); // Split by whitespace

    // Create an array of regular expression patterns for each word
    const searchPatterns = searchWords.map((word) => new RegExp(word, "i"));

    const data = await Product.find({
      $or: [
        { category: { $in: searchPatterns } }, // Match categories containing any word
        { name: { $in: searchPatterns } }, // Match names containing any word
      ],
    });

    return data;
  } catch (error: any) {
    throw new Error(`Failed to get products by search: ${error.message}`); // Handle any errors
  }
}

// Get products by name
export async function getProductsByName(params: string) {
  try {
    await connectToDB();

    const data = await Product.find({ name: params });

    return data;
  } catch (error: any) {
    throw new Error(`Failed to get products by name: ${error.message}`); // Handle any errors
  }
}

// Add products to favorite
export async function addToFavorite(userId: string, productId: ObjectId) {
  await connectToDB();

  try {
    // Find the existing user by ID
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    // Check if the product is already in the user's favorite list
    const alreadyInFavorite = currentUser.favorite.some(
      (favoriteProduct: Products) =>
        favoriteProduct.toString() === productId.toString()
    );

    if (alreadyInFavorite) {
      // Product already in favorites, remove it
      currentUser.favorite = currentUser.favorite.filter(
        (favoriteProduct: Products) =>
          favoriteProduct.toString() !== productId.toString()
      );
    } else {
      // Product not in favorites, add it
      const productToAdd = await Product.findById(productId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      currentUser.favorite.push(productToAdd);
    }

    // Save the updated user object
    await currentUser.save();
  } catch (error: any) {
    throw new Error(`Failed to add product to favorite: ${error.message}`); // Handle any errors
  }
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
      bagItem.product._id?.toString() === params.product.toString() &&
      bagItem.size === params.size
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

// Update bag item
export async function updateItem(
  itemId: ObjectId,
  quantity: number,
  size: string
) {
  try {
    await connectToDB();

    // Find the item to be updated
    const itemToUpdate = await Item.findById(itemId);

    if (!itemToUpdate) {
      throw new Error(`Item with ID ${itemId} not found.`);
    }

    // Check if there is enough stock for the requested quantity
    const product = await Product.findById(itemToUpdate.product);
    if (product) {
      // If the product has sizes, find the stock for the selected size
      if (product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.indexOf(size);
        if (sizeIndex !== -1) {
          if (product.stock[sizeIndex] < quantity) {
            throw new Error(`Not enough stock for size ${size}`);
          }
        } else {
          throw new Error(`Size ${size} not found for product ${product.name}`);
        }
      } else {
        // If the product doesn't have sizes, use stock at index 0
        if (product.stock[0] < quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }
      }
    } else {
      throw new Error(`Product with ID ${itemToUpdate.product} not found.`);
    }

    // Update the item's quantity if there is enough stock
    itemToUpdate.quantity = quantity;
    await itemToUpdate.save();
  } catch (error: any) {
    throw new Error(`Failed to update item: ${error.message}`);
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
  userId: string,
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
        pending: `${MERCADOPAGO_URL}/profile/orders`,
        success: `${MERCADOPAGO_URL}/profile/orders`,
      },
      payer: {
        email: email,
        identification: { type: "DNI", number: `${dni}` },
      },
      external_reference: userId,
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
  const session = await startSession();
  session.startTransaction();

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

    // Update the sold count for each product in the picked array
    for (const pickedItem of newPicked) {
      const product = await Product.findOne({ sku: pickedItem.sku }); // Using 'sku' as a unique identifier for products
      if (product) {
        if (product.sizes && product.sizes.length > 0) {
          // If the product has sizes, update stock and sold count for the selected size
          const sizeIndex = product.sizes.indexOf(pickedItem.description);
          if (sizeIndex !== -1) {
            if (product.stock[sizeIndex] >= pickedItem.quantity) {
              product.stock[sizeIndex] -= pickedItem.quantity;
              product.sold[sizeIndex] += pickedItem.quantity;
            } else {
              throw new Error(
                `Not enough stock for size ${pickedItem.description}`
              );
            }
          } else {
            throw new Error(
              `Size ${pickedItem.description} not found for product ${product.name}`
            );
          }
        } else {
          // If the product doesn't have sizes, update stock at index 0 and sold count at index 0
          if (product.stock[0] >= pickedItem.quantity) {
            product.stock[0] -= pickedItem.quantity;
            product.sold[0] += pickedItem.quantity;
          } else {
            throw new Error(`Not enough stock for product ${product.name}`);
          }
        }

        await product.save();
      }
    }

    // Delete items from the 'Item' collection
    const itemsToRemove = currentSession.bag.map((item: Items) => item._id);
    await Item.deleteMany({ _id: { $in: itemsToRemove } });

    // Clear user's bag
    currentSession.bag = [];

    // Save user session
    await currentSession.save();

    await session.commitTransaction();
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(`Failed to create a new order: ${error.message}`);
  } finally {
    session.endSession();
  }
}

//Get orders
export async function getOrders(params: string) {
  try {
    await connectToDB();

    // Find the user based on the provided userId
    const currentSession = await User.findById(params);

    if (!currentSession) {
      throw new Error(`User not found with id: ${params}`);
    }

    // Fetch orders associated with the user
    const orders = await Order.find({ reference: params })
      .populate("payer") // Populate the payer subdocument
      .populate("payment") // Populate the payment subdocument
      .populate("picked") // Populate the picked subdocuments
      .populate("transaction") // Populate the transaction subdocument
      .sort({ date: -1 }); // Sort by date

    return orders;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}

//Get favorites
export async function getFavorites(userId: string) {
  try {
    await connectToDB();

    // Find the user based on the provided userId
    const currentSession = await User.findById(userId).populate("favorite"); // Populate favorites

    if (!currentSession) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return currentSession.favorite;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}
