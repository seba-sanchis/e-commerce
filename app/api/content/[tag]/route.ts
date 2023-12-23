import { NextRequest, NextResponse } from "next/server";
import { getContentByTag } from "@/lib/actions/content.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { tag: string } }
) => {
  try {
    const content = await getContentByTag(params.tag);

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
      { message: "Failed to get content by tag." },
      { status: 500 }
    );
  }
};
