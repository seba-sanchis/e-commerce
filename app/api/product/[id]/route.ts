import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongoose";

import { editProduct, getProductsById } from "@/lib/actions/product.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    const product = await getProductsById(params.id);

    return NextResponse.json(product, {
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

// PATCH (update)
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  const data = await request.json();

  try {
    const product = await editProduct(data);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
};
