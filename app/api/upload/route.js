import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();

    const file = data.get("file");

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult =
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "hilaire-products" },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          )
          .end(buffer);
      });

    return Response.json({
      url: uploadResult.secure_url,
    });
  } catch (err) {
    console.log(err);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}