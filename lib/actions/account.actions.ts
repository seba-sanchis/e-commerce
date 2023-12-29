"use server";

import bcrypt from "bcryptjs";

import { Account } from "@/types";
import { connectToDB } from "../database";
import AccountModel from "@/models/account";

// Update account
export async function editAccount(params: Account) {
  const { _id, email, password } = params;

  try {
    await connectToDB();

    // Find the existing account by ID
    const existingAccount = await AccountModel.findById(_id);

    if (!existingAccount) throw new Error("Account not found");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the account with new data
    existingAccount.email = email;
    existingAccount.password = hashedPassword;

    await existingAccount.save();
  } catch (error: any) {
    throw new Error(`Failed to update account: ${error.message}`);
  }
}
