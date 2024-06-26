import { NextRequest, NextResponse } from "next/server";
import {MongoClient, ObjectId} from 'mongodb';

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
    const db = client.db("centiweb");
    const collection = db.collection("posts");
    const data = await req.json();
    const id = new ObjectId(data.id);

    await collection.deleteOne({"_id": id});

    return NextResponse.json({
        status: "done"
    });
}