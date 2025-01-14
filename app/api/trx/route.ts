import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const db = client.db("Centichain");
    const collection = db.collection("reciepts");
    const request = await req.json();
    const hash = request.hash;

    const transaction = await collection.findOne({ "hash": hash.trim() });

    if (!transaction) {
      return NextResponse.json({
        status: "error",
        message: "Transaction not found",
        transaction: null
      });
    }

    return NextResponse.json({
      status: "success",
      transaction: transaction
    });

  } catch (e) {
    return NextResponse.json({
      status: "error",
      message: e instanceof Error ? e.message : "Unknown error occurred",
      transaction: null
    });
  }
}
