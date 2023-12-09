import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import User from "@/models/user";

// GET (read)
export const GET = async () => {
  try {
    await connectToDB();

    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
      { status: 500 }
    );
  }
};