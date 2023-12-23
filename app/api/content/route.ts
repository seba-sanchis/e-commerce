import { NextResponse } from "next/server";
import { getContent } from "@/lib/actions/content.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async () => {
  try {
    const content = await getContent();

    return NextResponse.json(content, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get all content." },
      { status: 500 }
    );
  }
};
