import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongoose";

import { getContentById, editContent } from "@/lib/actions/content.actions";


export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    const content = await getContentById(params.id);

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
      { message: "Failed to get content by ID." },
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
    // Update content with new data
    const content = await editContent(data);

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update content" },
      { status: 500 }
    );
  }
};
