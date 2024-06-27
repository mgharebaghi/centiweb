import { MongoClient, WithId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    let data: Post[] = [];
    const db = client.db("centiweb");
    const collection = db.collection<WithId<Post>>("posts");
    const cursor = await collection.find({ type: "article" });

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
