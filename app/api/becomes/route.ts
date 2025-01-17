import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb://0.0.0.0:27017";

export async function POST(req: Request) {
  const client = new MongoClient(uri);
  
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully");

    const db = client.db("centiweb");
    const collection = db.collection("posts");

    console.log("Processing request:", req);
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({
        status: "error",
        message: "Title is required",
      });
    }

    // Split search title into words
    const searchWords = title.toLowerCase().split(/\s+/);

    // Find documents that match any of the words
    const cursor = collection.find({
      type: "becomes",
      $or: [
        // Match exact title
        { title: { $regex: title, $options: "i" } },
        // Match any word in the title
        {
          title: {
            $regex: searchWords
              .map((word: string) => `\\b${word}\\b`)
              .join("|"),
            $options: "i",
          },
        },
      ],
    });

    const posts = await cursor.toArray();

    // Sort results by relevance - exact matches first
    posts.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const searchTitle = title.toLowerCase();

      if (aTitle === searchTitle && bTitle !== searchTitle) return -1;
      if (bTitle === searchTitle && aTitle !== searchTitle) return 1;
      return 0;
    });

    return NextResponse.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json({
      status: "error",
      message: "Server error: " + error,
    });
  } finally {
    console.log("Closing MongoDB connection");
    await client.close();
  }
}
