import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const db = client.db("centiweb");
    const collection = db.collection("posts");
    const request = await req.json();
    const id = new ObjectId(request.id);

    const doc = await collection.findOne({ _id: id });

    return NextResponse.json({
      status: "success",
      article: doc,
    });
  } catch (e) {
    return NextResponse.json({
      status: "failed",
      article: {},
    });
  }
}
