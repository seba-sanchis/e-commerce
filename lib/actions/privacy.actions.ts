"use server";

import { connectToDB } from "../database";
import User from "@/models/user";
import { Privacy } from "@/types";

// Update privacy
export async function editPrivacy(params: Privacy) {
  const { _id, firstName, lastName, dni, birthday } = params;

  try {
    await connectToDB();

    // Find the existing user by ID and populate the referenced documents
    const currentUser = await User.findById(_id);

    if (!currentUser) throw new Error("User not found");

    // Update the privacy with new data
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.dni = dni;
    currentUser.birthday = birthday;

    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update privacy: ${error.message}`);
    }
  }
}
