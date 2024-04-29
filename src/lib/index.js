'use server'

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI)
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "chatwave",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
}

export const revalidate = (path) => {
  if (typeof path === "string") {
    revalidatePath(path);
  } else {
    path.map((p) => revalidatePath(p));
  }
};