import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic"; // defaults to force-static

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: ObjectId } }
) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });

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
  const {
    firstName,
    lastName,
    dni,
    birthday,
    region,
    location,
    address,
    postcode,
    email,
    areaCode,
    phone,
  } = await request.json();

  try {
    await connectToDB();

    // Find the existing user by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Update the user with new data
    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.dni = dni;
    existingUser.birthday = birthday;
    existingUser.region = region;
    existingUser.location = location;
    existingUser.address = address;
    existingUser.postcode = postcode;
    existingUser.email = email;
    existingUser.areaCode = areaCode;
    existingUser.phone = phone;

    await existingUser.save();

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user" },
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

    await User.findByIdAndDelete(params.id);

    return NextResponse.json("User deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
};
