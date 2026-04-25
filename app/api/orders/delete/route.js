import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {

  const { id } = await req.json();

  await connectDB();

  await Order.findByIdAndDelete(id);

  return Response.json({ success: true });

}