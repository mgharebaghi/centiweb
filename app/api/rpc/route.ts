import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { RPC } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    let request = await req.json();
    let db = client.db("centiweb");
    let collection = db.collection<WithId<RPC>>("rpc");
    let doc = await collection.findOne({ addr: request.addr });

    if (!doc) {
      await collection.insertOne(request);
    }

    return NextResponse.json({
      status: "success",
    });
  } catch (e) {
    return NextResponse.json({
      status: "error: " + e,
    });
  }
}
