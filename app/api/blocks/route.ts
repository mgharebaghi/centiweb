import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function GET() {
  const db = client.db("Blockchain");
  const collection = db.collection("Blocks");
  const number = await collection.countDocuments();

  return NextResponse.json({
    number: number,
  });
}
