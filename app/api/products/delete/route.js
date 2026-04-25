import { deleteProduct } from "@/actions/productActions";

export async function POST(req) {
  const { id } = await req.json();

  await deleteProduct(id);

  return Response.json({ success: true });
}