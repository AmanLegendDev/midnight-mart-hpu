import { toggleProductField } from "@/actions/productActions";

export async function POST(req) {
  const { id, field, value } =
    await req.json();

  await toggleProductField(
    id,
    field,
    value
  );

  return Response.json({
    success: true,
  });
}