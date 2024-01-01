import { NextResponse } from "next/server";

import { getUsers } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async () => {
  try {
    const users = await getUsers();

    return NextResponse.json(users, {
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
