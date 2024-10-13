import { MongoClient, WithId } from "mongodb";
import { Transaction } from "../types/types";
import { NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = client.db("Centichain");
    const collection = db.collection<WithId<Transaction>>("reciepts");
    const count = await collection.countDocuments({ status: "Confirmed" });

    return NextResponse.json({
      data: count,
    });
  } catch (e) {
    console.log(e);
  }
}
