import { NextRequest, NextResponse } from "next/server";
import { MongoClient, WithId } from "mongodb";
import { Outnode, Relays } from "../types/types";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const centiweb_db = client.db("centiweb");
const collection = centiweb_db.collection<WithId<Relays>>("relays");
const centichain_db = client.db("Centichain");
const centichain_collection = centichain_db.collection<WithId<Outnode>>("outnodes");

export async function POST(req: NextRequest) {
  try {
    let anothers: Relays[] = [];
    let request = await req.json();
    let doc = await collection.findOne({ addr: request.addr });
    let cursor = await collection.find();

    await cursor.forEach((doc) => {
      anothers.push({
        addr: doc.addr,
        wallet: doc.wallet,
        join_date: doc.join_date || new Date().toISOString(),
      });
    });

    // Extract peer ID from address
    const peerIdMatch = request.addr.match(/\/p2p\/([^/]+)/);
    const peerId = peerIdMatch ? peerIdMatch[1] : null;

    // Check if peer ID exists in outnodes collection
    let existsInOutnodes = false;
    if (peerId) {
      const outnode = await centichain_collection.findOne({ id: peerId });
      existsInOutnodes = !!outnode;
    }

    // If it exists in outnodes, don't proceed with insertion
    if (existsInOutnodes) {
      return NextResponse.json({
      status: "failed",
      detail: "peer exists in outnodes!",
      anothers: anothers,
      });
    }

    if (!doc ) {
      request.join_date = new Date().toISOString();
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
    let final_data: Relays[] = [];

    await cursor.forEach((doc) => {
      addresses.push({
        addr: doc.addr,
        wallet: doc.wallet,
        join_date: doc.join_date,
      });
    });

    if (addresses.length > 50) {
      while (final_data.length <= 50) {
        let index = Math.floor(Math.random() * addresses.length);
        if (!final_data.includes(addresses[index])) {
          final_data.push(addresses[index]);
        }
      }
    } else {
      final_data = addresses;
    }

    return NextResponse.json({
      status: "success",
      data: final_data,
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
    const relay = req.nextUrl.searchParams.get("address");
    
    if (!relay) {
      return NextResponse.json({
        status: "failed",
      });
    }
    
    // Delete any document where the addr field contains the relay string
    await collection.deleteMany({ 
      addr: { $regex: relay, $options: 'i' } 
    });

    return NextResponse.json({
      status: "success",
    });
  } catch (e) {
    return NextResponse.json({
      status: "error: " + e,
    });
  }
}
