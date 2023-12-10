import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import Order from "@/models/order";
import Transaction from "@/models/transaction";
import { getUsers } from "@/lib/actions/user.actions";

// GET (read)
export const GET = async () => {
  try {
    const users = await getUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
      { status: 500 }
    );
  }
};
