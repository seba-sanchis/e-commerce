import { connectToDB } from "../database";
import Product from "@/models/product";

// Get products by name
export async function getProductsByName(params: string) {
  try {
    await connectToDB();

    const data = await Product.find({ name: params });

    return data;
  } catch (error: any) {
    throw new Error(`Failed to get products by name: ${error.message}`); // Handle any errors
  }
}

// Get products by sales (bestsellers)
export async function getProductsBySales() {
  try {
    await connectToDB();

    const products = await Product.find().sort({ sold: -1 }).limit(4);

    return products;
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`); // Handle any errors
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

    const data = await Product.find({
      $and: [
        {
          $or: [
            { category: { $in: searchPatterns } }, // Match categories containing any word
            { name: { $in: searchPatterns } }, // Match names containing any word
          ],
        },
        {
          $or: [
            { category: { $all: searchPatterns } }, // Match all categories
            { name: { $all: searchPatterns } }, // Match all names
          ],
        },
      ],
    });

    return data;
  } catch (error: any) {
    throw new Error(`Failed to get products by search: ${error.message}`); // Handle any errors
  }
}
