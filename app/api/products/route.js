import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {

  await connectDB();

  const products = await Product.find({
    isVisible: true
  }).populate("category");

  return Response.json(products);

}