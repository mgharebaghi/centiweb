import { NextResponse } from "next/server";
import { MongoClient, WithId, Decimal128 } from "mongodb";
import { Block } from "../types/types";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


export async function GET() {
  await client.connect();
  let db = client.db("Blockchain");
  let collection = db.collection<WithId<Block>>("Blocks");
  let cursor = await collection.find({});
  let generated:number = 0;
  let all:number = 21000000.0;

  await cursor.forEach((doc) => {
    generated = generated + parseFloat(doc.body.coinbase.coinbase_data.reward.toString());
  })

  return NextResponse.json({
    message: all - generated
  });
}
