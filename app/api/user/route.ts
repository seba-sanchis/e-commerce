import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import UserModel from "@/models/user";
import OrderModel from "@/models/order";
import TransactionModel from "@/models/transaction";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async () => {
  try {
    await connectToDB();

    const users = await UserModel.find({}).populate({
      path: "purchases",
      model: OrderModel,
      populate: {
        path: "transaction", // Populate the "transaction" field in purchases
        model: TransactionModel,
      },
    });

    return NextResponse.json(users, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
      { status: 500 }
    );
  }
};
