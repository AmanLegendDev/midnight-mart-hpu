import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI missing");
}

export async function connectDB() {

if (mongoose.connection.readyState >= 1) {
return;
}

await mongoose.connect(MONGODB_URI);

}