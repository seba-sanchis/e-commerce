"use server";

import { startSession } from "mongoose";

import { connectToDB } from "../database";
import ItemModel from "@/models/item";
import OrderModel from "@/models/order";
import PayerModel from "@/models/payer";
import PaymentModel from "@/models/payment";
import PhoneModel from "@/models/phone";
import PickedModel from "@/models/picked";
import ProductModel from "@/models/product";
import TransactionModel from "@/models/transaction";
import UserModel from "@/models/user";
import {
  Item,
  Order,
  Payer,
  Payment,
  Phone,
  Picked,
  Transaction,
} from "@/types";

// Create a new order
export async function newOrder(
  order: Order,
  payer: Payer,
  paymentMethod: Payment,
  phone: Phone,
  picked: Picked[],
  transaction: Transaction
) {
  const session = await startSession();
  session.startTransaction();

  try {
    await connectToDB();

    const [newPayer, newPayment, newPicked, newTransaction] = await Promise.all(
      [
        new PayerModel({
          ...payer,
          phone: phone ? new PhoneModel(payer.phone) : undefined,
        }).save(),

        new PaymentModel(paymentMethod).save(),

        PickedModel.create(picked),

        new TransactionModel(transaction).save(),
      ]
    );

    const newOrder = new OrderModel({
      ...order,
      payer: newPayer._id,
      payment: newPayment._id,
      picked: newPicked.map((item: Picked) => item._id),
      transaction: newTransaction._id,
    });

    await newOrder.save();

    const currentSession = await UserModel.findById(order.reference);

    currentSession.purchases.push(newOrder);

    const updateProductPromises = newPicked.map(async (pickedItem) => {
      const product = await ProductModel.findOne({ sku: pickedItem.sku });

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

    const itemsToRemove = currentSession.bag.map((item: Item) => item._id);
    await ItemModel.deleteMany({ _id: { $in: itemsToRemove } });

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
    const currentSession = await UserModel.findById(params);

    if (!currentSession) {
      throw new Error(`User not found with id: ${params}`);
    }

    // Fetch orders associated with the user
    const orders = await OrderModel.find({ reference: params })
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
