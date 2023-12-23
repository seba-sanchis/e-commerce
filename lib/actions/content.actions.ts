"use server";

import { Content as Contents } from "@/common.types";
import { connectToDB } from "../database";
import Content from "@/models/content";
import { ObjectId } from "mongodb";

// Get all content
export async function getContent() {
  try {
    await connectToDB();

    const content = await Content.find({});

    return content;
  } catch (error: any) {
    throw new Error(`Failed to get all content: ${error.message}`); // Handle any errors
  }
}

// Get content by id
export async function getContentById(params: ObjectId) {
  try {
    await connectToDB();

    const content = await Content.find({ _id: params });

    return content;
  } catch (error: any) {
    throw new Error(`Failed to get content by ID: ${error.message}`); // Handle any errors
  }
}

// Get content by type
export async function getContentByType(params: string) {
  try {
    await connectToDB();

    const data = await Content.find({ type: params });

    return data;
  } catch (error: any) {
    throw new Error(`Failed to get content by type: ${error.message}`); // Handle any errors
  }
}

// Update content
export async function updateContent(params: Contents) {
  const { _id, title, subtitle, image, url, type } = params;

  try {
    await connectToDB();

    // Find the existing client by ID
    const existingContent = await Content.findById(_id);

    if (!existingContent) throw new Error("Content not found");

    // Update content with new data
    existingContent.title = title;
    existingContent.subtitle = subtitle;
    existingContent.image = image;
    existingContent.url = url;
    existingContent.type = type;
    existingContent.lastUpdated = new Date();

    await existingContent.save();
  } catch (error: any) {
    throw new Error(`Failed to update content: ${error.message}`);
  }
}
