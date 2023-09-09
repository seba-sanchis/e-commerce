"use server";

import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

import { connectToDB } from "../database";
import { authOptions } from "../options";
import User from "@/models/user";
import Item from "@/models/item";
import Product from "@/models/product";
import { Item as Items, Sessions } from "@/common.types";

// Add product to bag
export async function addToBag(params: Items) {
  const session = (await getServerSession(authOptions)) as Sessions;

  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(session.user?.id).populate({
    path: "bag",
    populate: {
      path: "product", // Populate the product field within bag
      model: Product,
    },
  });

  const alreadyInBag = currentSession.bag.find(
    (bagItem: Items) =>
      bagItem.product._id?.toString() === params.product.toString() &&
      bagItem.size === params.size
  );

  if (alreadyInBag) {
    // Product already in bag, update the quantity
    alreadyInBag.quantity += params.quantity;

    await Item.findByIdAndUpdate(alreadyInBag._id, {
      quantity: alreadyInBag.quantity,
    });
  } else {
    // Product not in bag, add as a new item
    const newItem = new Item(params);

    await newItem.save();

    currentSession.bag = [...currentSession.bag, newItem];

    await currentSession.save();
  }
}

//Get bag items
export async function getItems(params: string) {
  await connectToDB();

  // Find the existing client by ID
  const currentSession = await User.findById(params).populate({
    path: "bag",
    populate: {
      path: "product", // Populate the product field within bag
      model: Product,
      // select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });

  return currentSession;
}

// Update bag item
export async function updateItem(
  itemId: ObjectId,
  quantity: number,
  size: string
) {
  try {
    await connectToDB();

    // Find the item to be updated
    const itemToUpdate = await Item.findById(itemId);

    if (!itemToUpdate) {
      throw new Error(`Item with ID ${itemId} not found.`);
    }

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
      throw new Error(`Product with ID ${itemToUpdate.product} not found.`);
    }

    // Update the item's quantity if there is enough stock
    itemToUpdate.quantity = quantity;
    await itemToUpdate.save();
  } catch (error: any) {
    throw new Error(`Failed to update item: ${error.message}`);
  }
}

//Remove bag item
export async function removeItem(itemId: ObjectId, userId: string) {
  try {
    await connectToDB();

    // Find the item to be deleted
    const deletedItem = await Item.findByIdAndRemove(itemId);

    if (!deletedItem) {
      throw new Error("Item not found");
    }

    // Find the user associated with the item
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Update the user's bag by removing the deleted item
    user.bag.pull(deletedItem._id); // Use Mongoose's pull method to remove the item from the bag array
    await user.save();
  } catch (error: any) {
    throw new Error(
      `Failed to delete item and update user's bag: ${error.message}`
    );
  }
}
