import { createCategory } from "@/actions/categoryActions";

export async function POST(req) {
  const { name } = await req.json();

  const result = await createCategory(name);

  if (result.error) {
    return Response.json(
      result,
      { status: 400 }
    );
  }

  return Response.json(result);
}