import Product from "@/models/product";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const products = await Product.find({});

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://dashboard.sebastiansanchis.com",
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
