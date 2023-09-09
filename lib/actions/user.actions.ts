"use server";

import bcrypt from "bcryptjs";

import { connectToDB } from "../database";
import User from "@/models/user";
import { UserProfile } from "@/common.types";

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
