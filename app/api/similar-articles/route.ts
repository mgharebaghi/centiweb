import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();
    const db = client.db("centiweb");

    // Get the current article first to access its content
    const currentArticle = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!currentArticle) {
      throw new Error("Current article not found");
    }

    // Create text search criteria from current article's content and title
    const searchText = `${currentArticle.title} ${currentArticle.content}`;

    const similarArticles = await db
      .collection("posts")
      .aggregate([
        {
          $match: {
            _id: { $ne: new ObjectId(id) },
            type: type,
          }
        },
        {
          $addFields: {
            similarity: {
              $divide: [
                { 
                  $size: {
                    $setIntersection: [
                      { $split: [{ $toLower: "$content" }, " "] },
                      { $split: [{ $toLower: searchText }, " "] }
                    ]
                  }
                },
                { 
                  $add: [
                    { $size: { $split: [{ $toLower: "$content" }, " "] } },
                    { $size: { $split: [{ $toLower: searchText }, " "] } }
                  ]
                }
              ]
            }
          }
        },
        {
          $sort: { similarity: -1 }
        },
        {
          $limit: 3
        },
        {
          $project: {
            _id: 1,
            title: 1,
            image: 1,
            author: 1,
            createdAt: 1,
            description: 1,
            type: 1
          }
        }
      ])
      .toArray();

    return NextResponse.json({
      status: "success", 
      articles: similarArticles
    });
  } catch (error) {
    console.error("Error fetching similar articles:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch similar articles" },
      { status: 500 }
    );
  }
}
