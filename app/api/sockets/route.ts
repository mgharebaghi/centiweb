import { NextResponse } from 'next/server'
import { WebSocket, WebSocketServer } from 'ws'
import { MongoClient, WithId } from 'mongodb'
import { Block } from '../types/types';

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const db = client.db("Centichain");
const collection = db.collection<WithId<Block>>("Blocks");

// Initialize WebSocket server
const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws: WebSocket) => {
  
  collection.watch([{ $match: { operationType: 'insert' } }]).on('change', (change) => {
    if (change.operationType === 'insert') {
      const block = change.fullDocument;
      const reward = block.body.coinbase.reward;
      ws.send(JSON.stringify({ reward }));
    }
  });
})

// API route handler
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    wsEndpoint: 'wss://centichain.org:8080'
  })
}
