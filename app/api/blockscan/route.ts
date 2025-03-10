import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { Block } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    
    let data: Block[] = [];
    const db = client.db("Centichain");
    const collection = db.collection<WithId<Block>>("Blocks");
    const request = await req.json();
    const skip = request.page * 12 - 12;
    const docs = await collection
      .find({})
      .sort({"header.number": -1})
      .skip(skip)
      .limit(12);
    await docs.forEach((block) => {
      data.push(block);
    });

    return NextResponse.json({
      status: "success",
      blocks: data,
    });
  } catch (e) {
    return NextResponse.json({
      status: "error: " + e,
      blocks: [],
    });
  }
}
