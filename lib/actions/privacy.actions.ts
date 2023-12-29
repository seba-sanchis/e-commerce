"use server";

import { Privacy } from "@/types";
import { connectToDB } from "../database";
import PrivacyModel from "@/models/privacy";

// Update privacy
export async function editPrivacy(params: Privacy) {
  const { _id, firstName, lastName, dni, birthday } = params;

  try {
    await connectToDB();

    // Find the existing privacy by ID
    const existingPrivacy = await PrivacyModel.findById(_id);

    if (!existingPrivacy) throw new Error("Privacy not found");

    // Update the privacy with new data
    existingPrivacy.firstName = firstName;
    existingPrivacy.lastName = lastName;
    existingPrivacy.dni = dni;
    existingPrivacy.birthday = birthday;

    await existingPrivacy.save();
  } catch (error: any) {
    throw new Error(`Failed to update privacy: ${error.message}`);
  }
}
