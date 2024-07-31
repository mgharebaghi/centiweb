import { MongoClient, WithId } from "mongodb";
import { Post } from "../types/types";
import { NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
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
  } catch (e) {
    return NextResponse.json({
      data: [],
    });
  }
}
