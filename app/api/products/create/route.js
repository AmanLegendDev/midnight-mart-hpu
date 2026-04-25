import { createProduct } from "@/actions/productActions";

export async function POST(req) {
  const data = await req.json();

  const result = await createProduct(data);

  if (result.error) {
    return Response.json(result, {
      status: 400,
    });
  }

  return Response.json(result);
}