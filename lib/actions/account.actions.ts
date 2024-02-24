"use server";

import bcrypt from "bcryptjs";

import { connectToDB } from "../database";
import User from "@/models/user";
import { Account } from "@/types";

// Update account
export async function editAccount(params: Account) {
  const { _id, email, password } = params;

  try {
    await connectToDB();

    // Find the existing user by ID and populate the referenced documents
    const currentUser = await User.findById(_id);

    if (!currentUser) throw new Error("User not found");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the account with new data
    currentUser.email = email;
    currentUser.password = hashedPassword;

    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update account: ${error.message}`);
    }
  }
}
