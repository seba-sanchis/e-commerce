"use server";

import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { connectToDB } from "../database";
import User from "@/models/user";
import { Account } from "@/types";
import { sendEmail } from "../nodemailer";
import { getUserByEmail } from "./user.actions";
import { redirect } from "next/navigation";

const { NEXTAUTH_SECRET, NEXTAUTH_URL } = process.env;

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

export async function generateToken(email: string) {
  try {
    // Set the expiration time for the token
    const expirationTime = "1h";

    // Generate the JWT token with the user's email and expiration time
    const token = jwt.sign({ email }, NEXTAUTH_SECRET!, {
      expiresIn: expirationTime,
    });

    const user = await getUserByEmail(email);

    // check if user exists
    if (!user) throw new Error("User not found");

    const contact = {
      name: user.firstName,
      email: user.email,
      message: `Ingresá al siguiente link para restablecer tu contraseña: ${NEXTAUTH_URL}/reset/${token}`,
    };

    await sendEmail(contact);

    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }
}

export async function verifyToken(token: string) {
  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, NEXTAUTH_SECRET!);

    // Check if the decoded value has the expected properties
    if (typeof decoded === "object" && decoded.email) {
      return decoded.email; // Return the email associated with the token
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { error: error.message };
    } else if (error instanceof JsonWebTokenError) {
      console.log(`Failed to verify token: ${error.message}`);
      // Redirect if the token is malformed
      redirect("/");
    } else if (error instanceof Error) {
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }
}
