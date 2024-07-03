import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    const db = client.db("centiweb");
    const collection = db.collection("posts");
    const post = await req.json();
    const objectId = new ObjectId(post.id);

    const updatedData = {
      title: post.title,
      content: post.content,
      description: post.description,
      image: post.image,
    };

    await collection.updateOne({ _id: objectId }, { $set: updatedData });

    return NextResponse.json({
      message: "success",
    });
  } catch (e) {
    console.log(e);
  }
}
