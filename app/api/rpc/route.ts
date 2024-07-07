import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { RPC } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const db = client.db("centiweb");
const collection = db.collection<WithId<RPC>>("rpc");

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const doc = await collection.findOne({ addr: request.addr });

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

export async function GET() {
  try {
    let addresses: RPC[] = [];
    const cursor = collection.find({});

    await cursor.forEach((doc) => {
      addresses.push({ addr: doc.addr });
    });

    return NextResponse.json({
      status: "success",
      data: addresses,
    });
  } catch (e) {
    return NextResponse.json({
      status: "error: " + e,
      data: [],
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    let rpc = req.nextUrl.searchParams.get("addr");
    collection.deleteOne({ addr: rpc?.toString() });

    return NextResponse.json({
      status: "success",
    });
  } catch (e) {
    return NextResponse.json({
      status: "errpr: " + e,
    });
  }
}
