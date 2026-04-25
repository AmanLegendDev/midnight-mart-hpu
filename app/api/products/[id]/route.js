import { getSingleProduct } from "@/actions/productActions";

export async function GET(
  request,
  context
) {
  const id = context.params.id;

  const product = await getSingleProduct(id);

  if (!product) {
    return Response.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return Response.json(product);
}