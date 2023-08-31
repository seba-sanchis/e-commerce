import mongoose from "mongoose";
import { env } from "@/constants";

const { MONGODB_URI } = env;

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(`${MONGODB_URI}`, {
      dbName: "e-commerce",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
