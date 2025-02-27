import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017";
// Create a single client instance
const client = new MongoClient(uri);

// Connect to MongoDB once
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

export async function GET() {
  try {
    await connectDB();
    
    // Get relays from centiweb DB and map to Contributor interface
    const centiwebDb = client.db("centiweb");
    const relaysCollection = centiwebDb.collection("relays");
    const relays = await relaysCollection.find({}).toArray();
    const mappedRelays = relays.map(relay => ({
      peerid: relay.addr,
      wallet: relay.wallet,
      node_type: "relay",
      join_date: relay.join_date
    }));

    // Get validators from Centichain DB and map to Contributor interface
    const centichainDb = client.db("Centichain");
    const validatorsCollection = centichainDb.collection("validators");
    const validators = await validatorsCollection.find({}).toArray();
    const mappedValidators = validators.map(validator => ({
      peerid: validator.peerid,
      wallet: validator.wallet,
      node_type: "validator", 
      join_date: validator.join_date
    }));

    // Combine both collections
    const contributors = [...mappedRelays, ...mappedValidators];

    // Don't close the connection here
    return NextResponse.json(contributors);
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributors" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { wallet } = await request.json();
    await connectDB();

    const db = client.db("centiweb");
    const collection = db.collection("contributors");

    const contributors = await collection.find({
      wallet: wallet,
    }).toArray();

    // Don't close the connection here
    if (!contributors.length) {
      return NextResponse.json(
        { error: "No contributors found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contributors);
  } catch (error) {
    console.error("Error searching contributors:", error);
    return NextResponse.json(
      { error: "Failed to search contributors" },
      { status: 500 }
    );
  }
}

// Clean up on app shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing MongoDB connection");
  await client.close();
  isConnected = false;
});
