import OrderModel from "@/models/order";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import TransactionModel from "@/models/transaction";
import PayerModel from "@/models/payer";

export const dynamic = "force-dynamic"; // defaults to force-static

export const GET = async () => {
  try {
    await connectToDB();

    const orders = await OrderModel.find({})
      .populate({
        path: "transaction",
        model: TransactionModel,
      })
      .populate({
        path: "payer",
        model: PayerModel,
      });

    return NextResponse.json(orders, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all products." },
      { status: 500 }
    );
  }
};
