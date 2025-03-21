import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    const path = process.cwd() + `/public/images/${file.name}`;
    if (!file) {
      return NextResponse.json({
        status: "error",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    await writeFile(path, buffer);

    return NextResponse.json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
  }
}
