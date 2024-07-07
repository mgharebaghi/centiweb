import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { Relays } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    let anothers: Relays[] = [];
    let request = await req.json();
    let db = client.db("centiweb");
    let collection = db.collection<WithId<Relays>>("relays");
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
