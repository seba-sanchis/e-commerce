"use server";

import { ObjectId } from "mongodb";

import { connectToDB } from "../database";
import User from "@/models/user";
import Product from "@/models/product";
import { Product as Products } from "@/common.types";

// Add products to favorite
export async function addToFavorite(userId: string, productId: ObjectId) {
  await connectToDB();

  try {
    // Find the existing user by ID
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      throw new Error("User not found");
    }

    // Check if the product is already in the user's favorite list
    const alreadyInFavorite = currentUser.favorite.some(
      (favoriteProduct: Products) =>
        favoriteProduct.toString() === productId.toString()
    );

    if (alreadyInFavorite) {
      // Product already in favorites, remove it
      currentUser.favorite = currentUser.favorite.filter(
        (favoriteProduct: Products) =>
          favoriteProduct.toString() !== productId.toString()
      );
    } else {
      // Product not in favorites, add it
      const productToAdd = await Product.findById(productId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      currentUser.favorite.push(productToAdd);
    }

    // Save the updated user object
    await currentUser.save();
  } catch (error: any) {
    throw new Error(`Failed to add product to favorite: ${error.message}`); // Handle any errors
  }
}

//Get user's favorites
export async function getFavorites(userId: string) {
  try {
    await connectToDB();

    // Find the user based on the provided userId
    const currentSession = await User.findById(userId).populate("favorite"); // Populate favorites

    if (!currentSession) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return currentSession.favorite;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}
