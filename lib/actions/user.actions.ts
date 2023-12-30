"use server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { connectToDB } from "../database";
import { Item, UserProfile } from "@/types";
import AccountModel from "@/models/account";
import ItemModel from "@/models/item";
import OrderModel from "@/models/order";
import PrivacyModel from "@/models/privacy";
import ShippingModel from "@/models/shipping";
import TransactionModel from "@/models/transaction";
import UserModel from "@/models/user";

// Create a new user
export async function newUser(params: UserProfile) {
  const { account, privacy, shipping } = params;
  console.log("account ->", account);
  console.log("privacy ->", privacy);
  console.log("shipping ->", shipping);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectToDB();

    // Validations
    if (account.password.length < 6)
      throw new Error("Password must be at least 6 characters.");

    const userExists = await AccountModel.findOne({ email: account.email });
    if (userExists) throw new Error("Email already exists.");

    // Hash the password
    const hashedPassword = await bcrypt.hash(account.password, 12);
    console.log("account.email ->", account.email);
    console.log("hashedPassword ->", hashedPassword);

    // Create and save Account, Privacy, and Shipping documents within the same session
    const savedAccount = await new AccountModel({
      email: account.email,
      password: hashedPassword,
    }).save({ session });
    const savedPrivacy = await new PrivacyModel(privacy).save({ session });
    const savedShipping = await new ShippingModel(shipping).save({ session });
    console.log("savedAccount ->", savedAccount);
    console.log("savedPrivacy ->", savedPrivacy);
    console.log("savedShipping ->", savedShipping);
    // Create and save User document with references to Account, Privacy, and Shipping
    const newUser = new UserModel({
      account: savedAccount._id,
      privacy: savedPrivacy._id,
      shipping: savedShipping._id,
    });
    console.log("newUser ->", newUser);
    await newUser.save({ session });

    // Commit the transaction if all operations were successful
    await session.commitTransaction();
  } catch (error: any) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();
    throw new Error(`Failed to create a new user: ${error.message}`);
  } finally {
    // End the session
    session.endSession();
  }
}

// Get user by email
export async function getUser(email: string) {
  try {
    await connectToDB();

    // Find the account with the given email
    const account = await AccountModel.findOne({ email });

    if (!account) throw new Error("Account not found"); // Handle case when account is not found

    // store the user id from MongoDB to session
    const sessionUser = await UserModel.findOne({
      account: account._id,
    })
      .populate({
        path: "privacy",
        model: PrivacyModel,
      })
      .populate({
        path: "shipping",
        model: ShippingModel,
      })
      .populate({
        path: "bag",
        model: ItemModel,
      });

    if (!sessionUser) throw new Error("User not found"); // Handle case when user is not found

    // Calculate the total quantity of products in the bag
    const items = sessionUser.bag.reduce(
      (acc: number, item: Item) => acc + item.quantity,
      0
    );

    const session = {
      id: sessionUser._id.toString(),
      account: account,
      privacy: sessionUser.privacy,
      shipping: sessionUser.shipping,
      bag: sessionUser.bag,
      items: items,
      favorite: sessionUser.favorite,
    };

    return session;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`); // Handle any errors
  }
}

// Get all users
export async function getUsers() {
  try {
    await connectToDB();

    // store the user id from MongoDB to session
    const users = await UserModel.find({}).populate({
      path: "purchases",
      model: OrderModel,
      populate: {
        path: "transaction", // Populate the "transaction" field in purchases
        model: TransactionModel,
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`); // Handle any errors
  }
}
