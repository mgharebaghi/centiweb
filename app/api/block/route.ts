import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { searchValue } = await req.json();
    const db = client.db("Centichain");
    const collection = db.collection("Blocks");

    // Try to parse as number first for block number search
    const numberSearch = !isNaN(Number(searchValue)) ? Number(searchValue) : null;

    let block;
    if (numberSearch !== null) {
      // Search by block number
      block = await collection.findOne({ "header.number": numberSearch });
    } else {
      // Search by block hash
      block = await collection.findOne({ "header.hash": searchValue });
    }

    if (!block) {
      return NextResponse.json({
        status: "error",
        message: "Block not found"
      });
    }

    return NextResponse.json({
      status: "success",
      block: block
    });

  } catch (e) {
    return NextResponse.json({
      status: "error",
      message: e instanceof Error ? e.message : "Unknown error occurred"
    });
  }
}
