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
    const db = client.db("centiweb");
    const collection = db.collection("contributors");

    const contributors = await collection.find({}).toArray();

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
