import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Order from "@/models/Order";

export async function GET() {

await connectDB();

const products = await Product.countDocuments();
const categories = await Category.countDocuments();
const orders = await Order.countDocuments();

return Response.json({

products,
categories,
orders

});

}