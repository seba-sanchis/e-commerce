import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import ProductModel from "@/models/product";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    await connectToDB();

    const product = await ProductModel.findById(params.id);
    if (!product) return new Response("Product not found", { status: 404 });

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

    // Find the existing product by ID
    const existingProduct = await ProductModel.findById(params.id);

    if (!existingProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

    // Update the product with new data
    existingProduct.sku = sku;
    existingProduct.category = category;
    existingProduct.name = name;
    existingProduct.image = image;
    existingProduct.description = description;
    existingProduct.features = features;
    existingProduct.color = color;
    existingProduct.sizes = sizes;
    existingProduct.stock = stock;
    existingProduct.sold = sold;
    existingProduct.price = price;

    await existingProduct.save();

    return NextResponse.json(existingProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
};

// DELETE (delete)
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    await connectToDB();

    await ProductModel.findByIdAndDelete(params.id);

    return NextResponse.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
};
