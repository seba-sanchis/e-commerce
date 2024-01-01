import { NextResponse } from "next/server";

import { getProducts } from "@/lib/actions/product.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

export const GET = async () => {
  try {
    const products = await getProducts();

    return NextResponse.json(products, {
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
