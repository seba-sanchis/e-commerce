"use server";

import { startSession } from "mongoose";

import { connectToDB } from "../database";
import Item from "@/models/item";
import Order from "@/models/order";
import Payer from "@/models/payer";
import Payment from "@/models/payment";
import Phone from "@/models/phone";
import Picked from "@/models/picked";
import Product from "@/models/product";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import {
  Item as Items,
  Order as Orders,
  Payer as Payers,
  Payment as Payments,
  Phone as Phones,
  Picked as Pickeds,
  Transaction as Transactions,
} from "@/common.types";

// Create a new order
export async function newOrder(
  order: Orders,
  payer: Payers,
  payment: Payments,
  phone: Phones,
  picked: Pickeds[],
  transaction: Transactions
) {
  const session = await startSession();
  session.startTransaction();

  try {
    await connectToDB();

    // Create payer, payment, picked, and transaction subdocuments
    const newPayer = new Payer({
      ...payer,
      phone: phone ? new Phone(payer.phone) : undefined,
    });
    await newPayer.save();

    const newPayment = new Payment(payment);
    await newPayment.save();

    const newPicked = await Picked.create(picked);

    const newTransaction = new Transaction(transaction);
    await newTransaction.save();

    // Create and save the new order with associated subdocuments
    const newOrder = new Order({
      ...order,
      payer: newPayer._id,
      payment: newPayment._id,
      picked: newPicked.map((item: Pickeds) => item._id),
      transaction: newTransaction._id,
    });
    await newOrder.save();

    // Find the existing client by ID
    const currentSession = await User.findById(order.reference);

    // Update user's purchases
    currentSession.purchases.push(newOrder);

    // Update the sold count for each product in the picked array
    for (const pickedItem of newPicked) {
      const product = await Product.findOne({ sku: pickedItem.sku }); // Using 'sku' as a unique identifier for products
      if (product) {
        if (product.sizes && product.sizes.length > 0) {
          // If the product has sizes, update stock and sold count for the selected size
          const sizeIndex = product.sizes.indexOf(pickedItem.description);
          if (sizeIndex !== -1) {
            if (product.stock[sizeIndex] >= pickedItem.quantity) {
              product.stock[sizeIndex] -= pickedItem.quantity;
              product.sold[sizeIndex] += pickedItem.quantity;
            } else {
              throw new Error(
                `Not enough stock for size ${pickedItem.description}`
              );
            }
          } else {
            throw new Error(
              `Size ${pickedItem.description} not found for product ${product.name}`
            );
          }
        } else {
          // If the product doesn't have sizes, update stock at index 0 and sold count at index 0
          if (product.stock[0] >= pickedItem.quantity) {
            product.stock[0] -= pickedItem.quantity;
            product.sold[0] += pickedItem.quantity;
          } else {
            throw new Error(`Not enough stock for product ${product.name}`);
          }
        }

        await product.save();
      }
    }

    // Delete items from the 'Item' collection
    const itemsToRemove = currentSession.bag.map((item: Items) => item._id);
    await Item.deleteMany({ _id: { $in: itemsToRemove } });

    // Clear user's bag
    currentSession.bag = [];

    // Save user session
    await currentSession.save();

    await session.commitTransaction();
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(`Failed to create a new order: ${error.message}`);
  } finally {
    session.endSession();
  }
}

//Get orders
export async function getOrders(params: string) {
  try {
    await connectToDB();

    // Find the user based on the provided userId
    const currentSession = await User.findById(params);

    if (!currentSession) {
      throw new Error(`User not found with id: ${params}`);
    }

    // Fetch orders associated with the user
    const orders = await Order.find({ reference: params })
      .populate("payer") // Populate the payer subdocument
      .populate("payment") // Populate the payment subdocument
      .populate("picked") // Populate the picked subdocuments
      .populate("transaction") // Populate the transaction subdocument
      .sort({ date: -1 }); // Sort by date

    return orders;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}
