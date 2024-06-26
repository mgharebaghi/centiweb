import { MongoClient, WithId } from "mongodb";
import { Post } from "../types/types";
import { NextResponse } from "next/server";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function GET() {
  let data: Post[] = [];
  const db = client.db("centiweb");
  const collection = db.collection<WithId<Post>>("posts");
  const cursor = collection.find({
    $or: [{ type: "whitepaper" }, { type: "becomes" }],
  });

  await cursor.forEach((doc) => {
    data.push(doc);
  });

  return NextResponse.json({
    data: data,
  });
}
