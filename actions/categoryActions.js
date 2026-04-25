"use server";

import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import slugify from "slugify";

export async function createCategory(name) {
  try {
    await connectDB();

    const slug = slugify(name, {
      lower: true,
    });

    const exists = await Category.findOne({
      slug,
    });

    if (exists) {
      return {
        error: "Category already exists",
      };
    }

    await Category.create({
      name,
      slug,
    });

    return {
      success: true,
    };
  } catch (err) {
    return {
      error: "Server error",
    };
  }
}

export async function getCategories() {
  await connectDB();

  const categories = await Category.find().sort({
    createdAt: -1,
  });

  return JSON.parse(JSON.stringify(categories));
}

export async function deleteCategory(id) {
  await connectDB();

  await Category.findByIdAndDelete(id);

  return { success: true };
}