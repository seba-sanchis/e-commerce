import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import ProductModel from "@/models/product";

export const POST = async (request: NextRequest) => {
  const {
    sku,
    category,
    name,
    image,
    description,
    features,
    color,
    sizes,
    stock,
    sold,
    price,
  } = await request.json();

  try {
    await connectToDB();
    const newProduct = new ProductModel({
      sku,
      category,
      name,
      image,
      description,
      features,
      color,
      sizes,
      stock,
      sold,
      price,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a new product" },
      { status: 500 }
    );
  }
};
