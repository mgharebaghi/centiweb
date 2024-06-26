import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  console.log(data);
  const file: File | null = data.get("file") as unknown as File;
  const path = `./public/images/${file.name}`;
  if (!file) {
    return NextResponse.json({
      status: "error",
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(path, buffer);

  return NextResponse.json({
    status: "success",
  });
}
