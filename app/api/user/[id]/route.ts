import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongoose";

import { editUser, getUserById } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    const user = await getUserById(params.id);

    return NextResponse.json(user, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
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
    const user = await editUser(data);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
};
