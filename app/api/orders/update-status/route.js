import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {

  const { id, field, value } = await req.json();

  await connectDB();

  await Order.findByIdAndUpdate(id, {

    [field]: value

  });

  return Response.json({ success: true });

}