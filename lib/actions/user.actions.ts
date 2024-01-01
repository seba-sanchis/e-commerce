"use server";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

import { connectToDB } from "../database";
import { Account, Item, Privacy, Shipping, UserProfile } from "@/types";
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

    // Create and save Account, Privacy, and Shipping documents within the same session
    const savedAccount = await new AccountModel({
      email: account.email,
      password: hashedPassword,
    }).save({ session });
    const savedPrivacy = await new PrivacyModel(privacy).save({ session });
    const savedShipping = await new ShippingModel(shipping).save({ session });

    // Create and save User document with references to Account, Privacy, and Shipping
    const newUser = new UserModel({
      account: savedAccount._id,
      privacy: savedPrivacy._id,
      shipping: savedShipping._id,
    });

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

// Get user by id
export async function getUserById(_id: ObjectId) {
  try {
    await connectToDB();

    // store the user id from MongoDB to session
    const sessionUser = await UserModel.findOne({ _id })
      .populate({
        path: "account",
        model: AccountModel,
      })
      .populate({
        path: "privacy",
        model: PrivacyModel,
      })
      .populate({
        path: "shipping",
        model: ShippingModel,
      });

    if (!sessionUser) throw new Error("User not found"); // Handle case when user is not found

    // Calculate the total quantity of products in the bag
    const items = sessionUser.bag.reduce(
      (acc: number, item: Item) => acc + item.quantity,
      0
    );

    const session = {
      id: sessionUser._id.toString(),
      account: sessionUser.account,
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

// Get user by email
export async function getUserByEmail(email: string) {
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
    const users = await UserModel.find({})
      .populate({
        path: "account",
        model: AccountModel,
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

// Update user
export async function editUser(user: Account & Privacy & Shipping) {
  const {
    _id,
    email,
    firstName,
    lastName,
    dni,
    birthday,
    region,
    location,
    address,
    zip,
    areaCode,
    phone,
  } = user;

  try {
    await connectToDB();

    // Find the existing user by ID and populate the referenced documents
    const existingUser = await UserModel.findById(_id)
      .populate("account")
      .populate("privacy")
      .populate("shipping")
      .exec();

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user with new data
    existingUser.account.email = email;

    existingUser.privacy.firstName = firstName;
    existingUser.privacy.lastName = lastName;
    existingUser.privacy.dni = dni;
    existingUser.privacy.birthday = birthday;

    existingUser.shipping.region = region;
    existingUser.shipping.location = location;
    existingUser.shipping.address = address;
    existingUser.shipping.zip = zip;
    existingUser.shipping.areaCode = areaCode;
    existingUser.shipping.phone = phone;

    // Save updated subdocuments
    await existingUser.account.save();
    await existingUser.privacy.save();
    await existingUser.shipping.save();

    // Save the updated user
    await existingUser.save();

    return existingUser;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
