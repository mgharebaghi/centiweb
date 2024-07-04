import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    const logedin = await req.json();
    const db = client.db("centiweb");
    const collection = db.collection("sessions");
    const session = await collection.findOne({ hash: logedin.cookie });

    if (session) {
      return NextResponse.json({ login: "true" });
    } else {
      return NextResponse.json({ login: "false" });
    }
  } catch (e) {
    console.log("error: " + e);
  }
}
