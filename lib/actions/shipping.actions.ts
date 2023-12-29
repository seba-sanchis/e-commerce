"use server";

import { Shipping } from "@/types";
import { connectToDB } from "../database";
import ShippingModel from "@/models/shipping";

// Update shipping
export async function editShipping(params: Shipping) {
  const { _id, region, location, address, zip, areaCode, phone } = params;

  try {
    await connectToDB();

    // Find the existing shipping by ID
    const existingShipping = await ShippingModel.findById(_id);

    if (!existingShipping) throw new Error("Shipping not found");

    // Update the shipping with new data
    existingShipping.region = region;
    existingShipping.location = location;
    existingShipping.address = address;
    existingShipping.zip = zip;
    existingShipping.areaCode = areaCode;
    existingShipping.phone = phone;

    await existingShipping.save();
  } catch (error: any) {
    throw new Error(`Failed to update shipping: ${error.message}`);
  }
}
