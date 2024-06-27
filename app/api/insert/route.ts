import {MongoClient} from 'mongodb';
import { NextResponse } from 'next/server';

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

export async function POST(req: Request) {
    const db = client.db("centiweb");
    const coll = db.collection("posts");
    const post = await req.json();

    await coll.insertOne(post);

    return NextResponse.json({
        message: 'success'
    });
}