"use server";

import bcrypt from "bcryptjs";

import { connectToDB } from "../database";
import Order from "@/models/order";
import User from "@/models/user";
import { User as UserType } from "@/types";
import { ObjectId } from "mongoose";
import Product from "@/models/product";

// Create a new user
export async function newUser(user: UserType) {
  try {
    await connectToDB();

    // Validations
    if (user.password.length < 6)
      throw new Error("Password must be at least 6 characters.");

    // check if user already exists
    const userExists = await User.findOne({ email: user.email });

    if (userExists) throw new Error("Email already exists.");

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 12);

    // Create and save user document
    const newUser = new User({
      ...user,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create a new user: ${error.message}`);
    }
  }
}

// Get user by id
export async function getUserById(_id: ObjectId) {
  try {
    await connectToDB();

    // store the user id from MongoDB to session
    const currentUser = await User.findOne({ _id });

    // Handle case when user is not found
    if (!currentUser) throw new Error("User not found");

    const session = {
      id: currentUser._id,
      account: { email: currentUser.email },
      privacy: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        dni: currentUser.dni,
        birthday: currentUser.birthday,
      },
      shipping: {
        region: currentUser.region,
        location: currentUser.location,
        address: currentUser.address,
        zip: currentUser.zip,
        areaCode: currentUser.areaCode,
        phone: currentUser.phone,
      },
      bag: currentUser.bag,
      favorite: currentUser.favorite,
    };

    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get user by id: ${error.message}`);
    }
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    await connectToDB();

    // Find user with the given email
    const currentUser = await User.findOne({ email }).populate({
      path: "bag",
      populate: {
        path: "product", // Populate the product field within bag
        model: Product,
      },
    });

    // check if user exists
    if (!currentUser) throw new Error("User not found");

    const session = {
      id: currentUser._id,
      email: currentUser.email,
      password: currentUser.password,

      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dni: currentUser.dni,
      birthday: currentUser.birthday,

      region: currentUser.region,
      location: currentUser.location,
      address: currentUser.address,
      zip: currentUser.zip,
      areaCode: currentUser.areaCode,
      phone: currentUser.phone,

      bag: currentUser.bag,
      favorite: currentUser.favorite,
    };

    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  }
}

// Get all users
export async function getUsers() {
  try {
    await connectToDB();

    // get all users from MongoDB
    const users = await User.find({}).populate({
      path: "purchases",
      model: Order,
    });

    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all users: ${error.message}`);
    }
  }
}

// Update user
export async function editUser(user: UserType) {
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
    const currentUser = await User.findById(_id);

    if (!currentUser) throw new Error("User not found");

    // Update user's account with new data
    currentUser.email = email;

    // Update user's privacy with new data
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.dni = dni;
    currentUser.birthday = birthday;

    // Update user's shipping with new data
    currentUser.region = region;
    currentUser.location = location;
    currentUser.address = address;
    currentUser.zip = zip;
    currentUser.areaCode = areaCode;
    currentUser.phone = phone;

    // Save the updated user
    await currentUser.save();

    return currentUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
}
