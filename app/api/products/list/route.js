import { getProducts } from "@/actions/productActions";

export async function GET() {
  const products = await getProducts();

  return Response.json(products);
}