import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
client.connect();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = client.db("Centichain");
    const collection = db.collection("Blocks");
    const lastBlock = await collection.find().sort({ _id: -1 }).limit(1).toArray();

    return NextResponse.json({
      number: lastBlock.length > 0 ? lastBlock[0].header.number : 0,
    });
  } catch (e) {
    return NextResponse.json({
      number: 0,
    });
  }
}
