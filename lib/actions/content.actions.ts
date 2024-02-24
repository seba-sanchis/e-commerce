"use server";

import { ObjectId } from "mongoose";

import { connectToDB } from "../database";
import ContentModel from "@/models/content";
import { Content } from "@/types";

// Get all content
export async function getContent() {
  try {
    await connectToDB();

    const content = await ContentModel.find({});

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

    const content = await ContentModel.findOne({ _id: params });

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

    const data = await ContentModel.find({ tag: params });

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
export async function editContent(params: Content) {
  const { _id, title, subtitle, image, url, tag } = params;

  try {
    await connectToDB();

    // Find the existing client by ID
    const existingContent = await ContentModel.findById(_id);

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
