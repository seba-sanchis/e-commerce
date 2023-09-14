"use server";

import bcrypt from "bcryptjs";

import { connectToDB } from "../database";
import User from "@/models/user";
import { Item as Items, UserProfile } from "@/common.types";
import Item from "@/models/item";

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

// Get user by email
export async function getUser(user: UserProfile) {
  try {
    await connectToDB();

    // store the user id from MongoDB to session
    const sessionUser = await User.findOne({
      email: user.email as string,
    }).populate({
      path: "bag",
      model: Item,
    }); // Populate the items in the user's bag

    if (!sessionUser) {
      throw new Error("User not found"); // Handle case when user is not found
    }

    // Calculate the total quantity of products in the bag
    const items = sessionUser.bag.reduce(
      (acc: number, item: Items) => acc + item.quantity,
      0
    );

    const session = {
      id: sessionUser._id.toString(),
      email: sessionUser.email,
      dni: sessionUser.dni,
      bag: sessionUser.bag,
      items: items,
      favorite: sessionUser.favorite,
    };

    return session;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`); // Handle any errors
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

    const hashedPassword = await bcrypt.hash(password, 12);

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
    existingUser.password = hashedPassword;
    existingUser.areaCode = areaCode;
    existingUser.phone = phone;

    await existingUser.save();
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}
