import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { Relays } from "../types/types";
import { NextApiRequest } from "next";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const db = client.db("centiweb");
const collection = db.collection<WithId<Relays>>("relays");

export async function POST(req: NextRequest) {
  try {
    let anothers: Relays[] = [];
    let request = await req.json();
    let doc = await collection.findOne({ addr: request.addr });
    let cursor = await collection.find();

    await cursor.forEach((doc) => {
      anothers.push({ addr: doc.addr });
    });

    if (!doc) {
      await collection.insertOne(request);
      return NextResponse.json({
        status: "success",
        detail: "your address added",
        anothers: anothers,
      });
    } else {
      return NextResponse.json({
        status: "failed",
        detail: "your address already added",
        anothers: anothers,
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: "error",
      detail: "server problem: " + e,
    });
  }
}

export async function GET() {
  try {
    let addresses: Relays[] = [];
    let cursor = collection.find({});

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
    const relay = req.nextUrl.searchParams.get("addr");
    collection.deleteOne({ addr: relay?.toString() });

    return NextResponse.json({
      status: "success",
    });
  } catch (e) {
    return NextResponse.json({
      status: "error: " + e,
    });
  }
}
