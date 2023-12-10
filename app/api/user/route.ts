import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import Order from "@/models/order";
import Transaction from "@/models/transaction";
import { revalidatePath } from "next/cache";

// GET (read)
export const GET = async () => {
  try {
    await connectToDB();

    const users = await User.find({}).populate({
      path: "purchases",
      model: Order,
      populate: {
        path: "transaction", // Populate the "transaction" field in purchases
        model: Transaction,
      },
    });

    revalidatePath("/api/user");

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all users." },
      { status: 500 }
    );
  }
};
