import { MongoClient, WithId } from "mongodb";
import { NextResponse } from "next/server";
import { Post } from "../types/types";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function GET() {
  let data: Post[] = [];
  const db = client.db("centiweb");
  const collection = db.collection<WithId<Post>>("posts");
  const curosr = collection.find({ type: "dev" });

  await curosr.forEach((doc) => {
    data.push(doc);
  });

  return NextResponse.json({
    data: data,
  });
}
