import { connectDB } from "@/lib/db";
import CustomOrder from "@/models/CustomOrder";

export async function POST(req){

await connectDB();

const { id } = await req.json();

await CustomOrder.findByIdAndUpdate(id,{
status:"delivered"
});

return Response.json({
success:true
});

}