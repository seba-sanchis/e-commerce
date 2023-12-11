import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import Order from "@/models/order";
import Transaction from "@/models/transaction";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

// GET (read)
export const GET = async () => {
  try {
    // Set CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "https://65765e94bb457509ca524d82--cozy-sunburst-022120.netlify.app",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    await connectToDB();

    const users = await User.find({}).populate({
      path: "purchases",
      model: Order,
      populate: {
        path: "transaction", // Populate the "transaction" field in purchases
        model: Transaction,
      },
    });

    return NextResponse.json(users, { status: 200, headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
      { status: 500 }
    );
  }
};
