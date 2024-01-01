import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/database";
import { getOrders } from "@/lib/actions/order.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

export const GET = async () => {
  try {
    await connectToDB();

    const orders = await getOrders();

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
