import { NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { Block } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
client.connect();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let db = client.db("Centichain");
    let collection = db.collection<WithId<Block>>("Blocks");
    let cursor = await collection.find({});
    let generated: number = 0;
    let all: number = 21000000.0;

    await cursor.forEach((doc) => {
      generated = generated + parseFloat(doc.body.coinbase.reward.toString());
    });

    return NextResponse.json(
      {
        message: all - generated,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (e) {
    return NextResponse.json({
      message: 0,
    });
  }
}
