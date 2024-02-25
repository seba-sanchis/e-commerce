"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { ObjectId, Types } from "mongoose";

import { connectToDB } from "../database";
import { authOptions } from "../auth";
import Product from "@/models/product";
import User from "@/models/user";
import { Item, Sessions } from "@/types";

// Add product to bag
export async function addToBag(params: Item) {
  try {
    const session = (await getServerSession(authOptions)) as Sessions;

    await connectToDB();

    // Find the existing client by ID
    const currentUser = await User.findById(session.user?.id).populate({
      path: "bag",
      populate: {
        path: "product", // Populate the product field within bag
        model: Product,
      },
    });

    const alreadyInBag = currentUser.bag.find(
      (bagItem: Item) =>
        bagItem.product._id?.toString() === params.product.toString() &&
        bagItem.size === params.size
    );

    if (alreadyInBag) {
      // Product already in bag, update the quantity
      alreadyInBag.quantity += params.quantity;
    } else {
      // Product not in bag, add as a new item
      currentUser.bag.push(params);
    }

    // Mark the 'bag' array as modified before saving
    currentUser.markModified("bag");

    // Save the updated user with the modified bag
    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add item to bag: ${error.message}`);
    }
  }

  revalidatePath("/bag");
}

//Get bag items
export async function getBag(params: string) {
  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(params).populate({
    path: "bag",
    populate: {
      path: "product", // Populate the product field within bag
      model: Product,
    },
  });

  return currentSession;
}

// Update bag item
export async function editBag(
  itemId: ObjectId,
  quantity: number,
  size: string
) {
  try {
    const session = (await getServerSession(authOptions)) as Sessions;

    await connectToDB();

    // Find the user by ID and populate the bag
    const currentUser = await User.findById(session.user?.id).populate({
      path: "bag",
      populate: {
        path: "product", // Populate the product field within bag
        model: Product,
      },
    });

    if (!currentUser) throw new Error("User not found");

    // Find the item to be updated in the user's bag
    const itemToUpdate = currentUser.bag.find((item: { _id: Types.ObjectId }) =>
      item._id.equals(itemId.toString())
    );

    if (!itemToUpdate) throw new Error("Item not found in user's bag.");

    // Check if there is enough stock for the requested quantity
    const product = await Product.findById(itemToUpdate.product);

    if (product) {
      // If the product has sizes, find the stock for the selected size
      if (product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.indexOf(size);
        if (sizeIndex !== -1) {
          if (product.stock[sizeIndex] < quantity) {
            throw new Error(`Not enough stock for size ${size}`);
          }
        } else {
          throw new Error(`Size ${size} not found for product ${product.name}`);
        }
      } else {
        // If the product doesn't have sizes, use stock at index 0
        if (product.stock[0] < quantity) {
          throw new Error(`Not enough stock for product ${product.name}`);
        }
      }
    } else {
      throw new Error("Product not found.");
    }

    // Update the item's quantity if there is enough stock
    itemToUpdate.quantity = quantity;

    // Save the updated user to persist changes
    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }
}

//Remove bag item
export async function removeItem(itemId: ObjectId) {
  try {
    const session = (await getServerSession(authOptions)) as Sessions;

    await connectToDB();

    // Find the user by ID
    const currentUser = await User.findById(session.user?.id);

    if (!currentUser) {
      throw new Error("User not found");
    }

    // Filter out the item to be removed from the bag array
    currentUser.bag = currentUser.bag.filter(
      (item: Types.ObjectId) => !item._id.equals(itemId.toString())
    );

    // Save the updated user to persist the removal
    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to delete item and update user's bag: ${error.message}`
      );
    }
  }
}
