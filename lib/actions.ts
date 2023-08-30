"use server";

import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import mercadopago from "mercadopago";

import { connectToDB } from "./database";
import { authOptions } from "./options";
import { Item as Items, Sessions, UserProfile } from "@/common.types";
import Item from "@/models/item";
import Product from "@/models/product";
import User from "@/models/user";
import { ObjectId } from "mongodb";
import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";

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

// Add products to cart
export async function addToCart(params: Items) {
  const session = (await getServerSession(authOptions)) as Sessions;

  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(session.user?.id).populate({
    path: "cart",
    populate: {
      path: "product", // Populate the product field within cart
      model: Product,
    },
  });

  const alreadyInCart = currentSession.cart.find(
    (cartItem: Items) =>
      cartItem.product._id?.toString() === params.product.toString()
  );

  if (alreadyInCart) {
    // Product already in cart, update the quantity
    alreadyInCart.quantity += params.quantity;

    await Item.findByIdAndUpdate(alreadyInCart._id, {
      quantity: alreadyInCart.quantity,
    });
  } else {
    // Product not in cart, add as a new item
    const newItem = new Item(params);

    await newItem.save();

    currentSession.cart = [...currentSession.cart, newItem];

    await currentSession.save();
  }
}

//Get cart items
export async function getItems(params: string) {
  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(params).populate({
    path: "cart",
    populate: {
      path: "product", // Populate the product field within cart
      model: Product,
      // select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });

  return currentSession;
}

//Update cart item
export async function updateItem(itemId: ObjectId, quantity: number) {
  try {
    await connectToDB();

    // Find the item to be updated
    await Item.findByIdAndUpdate(itemId, { quantity });
  } catch (error: any) {
    throw new Error(
      `Failed to delete item and update user's cart: ${error.message}`
    );
  }
}

//Remove cart item
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

    // Update the user's cart by removing the deleted item
    user.cart.pull(deletedItem._id); // Use Mongoose's pull method to remove the item from the cart array
    await user.save();
  } catch (error: any) {
    throw new Error(
      `Failed to delete item and update user's cart: ${error.message}`
    );
  }
}

// Payment gateway integration
export async function checkOut(
  params: PreferenceItem[],
  email: string,
  dni: number
) {
  // Agrega credenciales
  mercadopago.configure({
    access_token: `${process.env.MERCADOPAGO_TOKEN}`,
  });

  try {
    const response = await mercadopago.preferences.create({
      items: params,
      notification_url:
        "https://main.d3230oyu2t880h.amplifyapp.com/api/payment",
      back_urls: {
        failure: "https://main.d3230oyu2t880h.amplifyapp.com/bag",
        pending: "https://main.d3230oyu2t880h.amplifyapp.com/profile",
        success: "https://main.d3230oyu2t880h.amplifyapp.com/profile",
      },
      payer: {
        email: email,
        identification: { type: "DNI", number: `${dni}` },
      },
    });

    console.log("checkout:", response);

    return response.body;
  } catch (error: any) {
    throw new Error(`Failed to checkout: ${error.message}`);
  }
}
