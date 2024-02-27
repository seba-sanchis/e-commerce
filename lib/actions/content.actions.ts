"use server";

import { ObjectId } from "mongoose";

import { connectToDB } from "../database";
import Content from "@/models/content";
import { Content as ContentType } from "@/types";

// Get all content
export async function getContent() {
  try {
    await connectToDB();

    const content = await Content.find({});

    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get all content: ${error.message}`);
    }
  }
}

// Get content by id
export async function getContentById(params: ObjectId) {
  try {
    await connectToDB();

    const content = await Content.findOne({ _id: params });

    return content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get content by ID: ${error.message}`);
    }
  }
}

// Get content by tag
export async function getContentByTag(params: string) {
  try {
    await connectToDB();

    const data = await Content.find({ tag: params });

    if (data.length === 1) {
      // If there's only one item, return it as an object
      return data[0];
    } else {
      // If there are more than one items, return the array
      return data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get content by tag: ${error.message}`);
    }
  }
}

// Update content
export async function editContent(params: ContentType) {
  const { _id, title, subtitle, image, url, tag } = params;

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
    existingContent.tag = tag;
    existingContent.lastUpdated = new Date();

    await existingContent.save();

    return existingContent;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update content: ${error.message}`);
    }
  }
}
