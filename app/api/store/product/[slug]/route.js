import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request, context) {

  const params = await context.params;
  const slug = params.slug;

  await connectDB();

  const product = await Product.findOne({
    slug: slug,
    isVisible: true,
  }).populate("category");

  return Response.json(product);
} 