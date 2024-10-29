import { NextResponse } from 'next/server'
import { WebSocket, WebSocketServer } from 'ws'
import { MongoClient, WithId } from 'mongodb'
import { Block, Transaction } from '../types/types';

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const db = client.db("Centichain");
const collection = db.collection<WithId<Block>>("Blocks");
const collection2 = db.collection<WithId<Transaction>>("reciepts");

// Initialize WebSocket server
const wss = new WebSocketServer({ 
  port: 8080,
  perMessageDeflate: false,
  clientTracking: true,
  backlog: 100,
})

wss.on('connection', (ws: WebSocket) => {
  
  collection.watch([{ $match: { operationType: 'insert' } }]).on('change', (change) => {
    if (change.operationType === 'insert') {
      const block = change.fullDocument;
      const reward = block.body.coinbase.reward;
      ws.send(JSON.stringify({ 
        type: 'block',
        data: {reward}
       }));
    }
  });

  collection2.watch([{ $match: { operationType: 'insert' || 'update' } }]).on('change', (change) => {
    if ((change.operationType === 'insert' || change.operationType === 'update') && change.fullDocument) {
      const transaction = change.fullDocument;
      const status = transaction.status;
      ws.send(JSON.stringify({ 
        type: 'transaction',
        data: {status}
      }));
    }
  });
})

// API route handler
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    wsEndpoint: 'wss://centichain.org/ws'
  })
}
