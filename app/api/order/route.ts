import Order from "@/models/order";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import Transaction from "@/models/transaction";
import Payer from "@/models/payer";

export const GET = async () => {
  try {
    await connectToDB();

    const orders = await Order.find({})
      .populate({
        path: "transaction",
        model: Transaction,
      })
      .populate({
        path: "payer",
        model: Payer,
      });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all products." },
      { status: 500 }
    );
  }
};
