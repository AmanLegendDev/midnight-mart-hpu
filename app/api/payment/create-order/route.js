import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("KEY:", process.env.RAZORPAY_KEY_ID);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return Response.json(order);
  } catch (err) {
    console.log("RAZORPAY ERROR:", err);

    return Response.json(
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}