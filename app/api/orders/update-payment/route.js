import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {

await connectDB();

const { orderId } = await req.json();

await Order.findByIdAndUpdate(orderId, {

paymentStatus: "paid"

});

return Response.json({

success: true

});

}