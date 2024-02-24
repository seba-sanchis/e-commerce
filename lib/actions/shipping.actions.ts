"use server";

import { connectToDB } from "../database";
import User from "@/models/user";
import { Shipping } from "@/types";

// Update shipping
export async function editShipping(params: Shipping) {
  const { _id, region, location, address, zip, areaCode, phone } = params;

  try {
    await connectToDB();

    // Find the existing user by ID and populate the referenced documents
    const currentUser = await User.findById(_id);

    if (!currentUser) throw new Error("User not found");

    // Update the shipping with new data
    currentUser.region = region;
    currentUser.location = location;
    currentUser.address = address;
    currentUser.zip = zip;
    currentUser.areaCode = areaCode;
    currentUser.phone = phone;

    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update shipping: ${error.message}`);
    }
  }
}
