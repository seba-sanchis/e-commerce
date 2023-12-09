import Product from "@/models/product";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const dynamicParams = true;
// export const revalidate = 0;

export const GET = async () => {
  try {
    await connectToDB();

    const products = await Product.find({});

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all products." },
      { status: 500 }
    );
  }
};
