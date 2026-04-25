import { updateProduct } from "@/actions/productActions";

export async function POST(req) {
  const { id, data } = await req.json();

  await updateProduct(id, data);

  return Response.json({ success: true });
}