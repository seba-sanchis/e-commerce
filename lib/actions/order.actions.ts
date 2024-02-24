"use server";

import { connectToDB } from "../database";
import Order from "@/models/order";
import Product from "@/models/product";
import User from "@/models/user";
import { Order as OrderType } from "@/types";

// Create a new order
export async function newOrder(order: OrderType) {
  try {
    await connectToDB();

    const newOrder = new Order(order);

    await newOrder.save();

    const currentUser = await User.findById(order.reference);

    if (!currentUser) throw new Error("User not found");

    currentUser.purchases.push(newOrder);

    for (const item of newOrder.picked) {
      const product = await Product.findOne({ sku: item.sku });

      if (!product) {
        throw new Error(`Product with SKU ${item.sku} not found`);
      }

      if (product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.indexOf(item.description);
        if (sizeIndex !== -1 && product.stock[sizeIndex] >= item.quantity) {
          product.stock[sizeIndex] -= item.quantity;
          product.sold[sizeIndex] += item.quantity;
          await product.save();
        } else {
          throw new Error(`Not enough stock for size ${item.description}`);
        }
      } else if (product.stock[0] >= item.quantity) {
        product.stock[0] -= item.quantity;
        product.sold[0] += item.quantity;
        await product.save();
      } else {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
    }

    // Clear user's bag after successfully processing the order
    currentUser.bag = [];

    await currentUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create a new order: ${error.message}`);
    }
  }
}

//Get all orders
export async function getOrders() {
  try {
    await connectToDB();

    // Fetch orders associated with the user
    const orders = await Order.find().sort({ date: -1 }); // Sort by date

    return orders;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }
}

//Get orders from a user
export async function getUserOrders(params: string) {
  try {
    await connectToDB();

    // Find the user based on the provided userId
    const currentUser = await User.findById(params);

    if (!currentUser) throw new Error("User not found");

    // Fetch orders associated with the user
    const orders = await Order.find({ reference: params }).sort({ date: -1 }); // Sort by date

    return orders;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }
}
