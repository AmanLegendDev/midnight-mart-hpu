import { connectDB } from "@/lib/db";
import CustomOrder from "@/models/CustomOrder";

export async function GET(){

await connectDB();

const data=await CustomOrder.find().sort({
createdAt:-1
});

return Response.json(data);

}