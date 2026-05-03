import { updateCategory } from "@/actions/categoryActions";

export async function POST(req){

const { id, name, image } = await req.json();

await updateCategory(id, name, image);

return Response.json({ success:true });

}