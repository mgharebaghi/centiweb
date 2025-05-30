import { NextRequest, NextResponse } from "next/server";
import { BaseTransaction } from "../types/types";
import { MongoClient, WithId } from "mongodb";
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let transactions: BaseTransaction[] = [];
    const db = client.db("Centichain");
    const collection = db.collection<WithId<BaseTransaction>>("reciepts");
    const count = await collection.countDocuments();
    const request = await req.json();
    const skip = request.page * 12 - 12;
    const docs = await collection
      .find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(12);

    await docs.forEach((trx) => {
      transactions.push(trx);
    });

    return NextResponse.json({
      status: "success",
      trxs: transactions,
      count: count,
    });
  } catch (e) {
    return NextResponse.json({
      status: "error" + e,
      trxs: [],
      count: 0,
    });
  }
}
