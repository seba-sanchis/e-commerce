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

    const [newPayer, newPayment, newPicked, newTransaction] = await Promise.all(
      [
        new Payer({
          ...payer,
          phone: phone ? new Phone(payer.phone) : undefined,
        }).save(),

        new Payment(payment).save(),

        Picked.create(picked),

        new Transaction(transaction).save(),
      ]
    );

    const newOrder = new Order({
      ...order,
      payer: newPayer._id,
      payment: newPayment._id,
      picked: newPicked.map((item: Pickeds) => item._id),
      transaction: newTransaction._id,
    });

    console.log("3rd step:", newOrder);

    await newOrder.save();

    const currentSession = await User.findById(order.reference);

    currentSession.purchases.push(newOrder);

    const updateProductPromises = newPicked.map(async (pickedItem) => {
      const product = await Product.findOne({ sku: pickedItem.sku });

      if (!product) {
        throw new Error(`Product with SKU ${pickedItem.sku} not found`);
      }

      if (product.sizes && product.sizes.length > 0) {
        const sizeIndex = product.sizes.indexOf(pickedItem.description);
        if (
          sizeIndex !== -1 &&
          product.stock[sizeIndex] >= pickedItem.quantity
        ) {
          product.stock[sizeIndex] -= pickedItem.quantity;
          product.sold[sizeIndex] += pickedItem.quantity;
        } else {
          throw new Error(
            `Not enough stock for size ${pickedItem.description}`
          );
        }
      } else if (product.stock[0] >= pickedItem.quantity) {
        product.stock[0] -= pickedItem.quantity;
        product.sold[0] += pickedItem.quantity;
      } else {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      await product.save();
    });

    await Promise.all(updateProductPromises);

    const itemsToRemove = currentSession.bag.map((item: Items) => item._id);
    await Item.deleteMany({ _id: { $in: itemsToRemove } });

    currentSession.bag = [];

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
