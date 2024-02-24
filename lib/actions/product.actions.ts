"use server";

import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";

import { connectToDB } from "../database";
import ProductModel from "@/models/product";
import { Product } from "@/types";

// Get products by name
export async function getProducts() {
  try {
    await connectToDB();

    const data = await ProductModel.find({});

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all products: ${error.message}`);
    }
  }
}

// Get products by ID
export async function getProductsById(_id: ObjectId) {
  try {
    await connectToDB();

    const data = await ProductModel.findById(_id);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get products by ID: ${error.message}`);
    }
  }
}

// Get products by name
export async function getProductsByName(params: string) {
  try {
    await connectToDB();

    const data = await ProductModel.find({ name: params });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get products by name: ${error.message}`);
    }
  }
}

// Get products by sales (bestsellers)
export async function getProductsBySales() {
  try {
    await connectToDB();

    const products = await ProductModel.find().sort({ sold: -1 }).limit(8);

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get products by sales: ${error.message}`);
    }
  }
}

// Get products by search
export async function getProductsBySearch(params: string) {
  try {
    await connectToDB();

    // Decode the URL-encoded string and split it into individual words
    const decodedParams = decodeURIComponent(params);
    const searchWords = decodedParams.trim().split(/\s+/); // Split by whitespace

    // Create an array of regular expression patterns for each word
    const searchPatterns = searchWords.map((word) => new RegExp(word, "i"));

    const data = await ProductModel.find({
      $and: [
        {
          $or: [
            { category: { $in: searchPatterns } }, // Match collections containing any word
            { name: { $in: searchPatterns } }, // Match names containing any word
          ],
        },
        {
          $or: [
            { category: { $all: searchPatterns } }, // Match all collections
            { name: { $all: searchPatterns } }, // Match all names
          ],
        },
      ],
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get products by search: ${error.message}`);
    }
  }
}

// Update product
export async function editProduct(params: Product) {
  const {
    _id,
    sku,
    category,
    name,
    image,
    description,
    features,
    color,
    sizes,
    stock,
    sold,
    price,
  } = params;

  try {
    await connectToDB();

    // Find the existing product by ID
    const existingProduct = await ProductModel.findById(_id);

    if (!existingProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

    // Update the product with new data
    existingProduct.sku = sku;
    existingProduct.category = category;
    existingProduct.name = name;
    existingProduct.image = image;
    existingProduct.description = description;
    existingProduct.features = features;
    existingProduct.color = color;
    existingProduct.sizes = sizes;
    existingProduct.stock = stock;
    existingProduct.sold = sold;
    existingProduct.price = price;

    await existingProduct.save();

    return existingProduct;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }
}
