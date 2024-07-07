import { Decimal128, MongoClient, ObjectId } from "mongodb";

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  type: string;
  description: string;
  image: string;
}

export interface Block {
  header: Header;
  body: Body;
}

interface Header {
  blockhash: string;
  number: number;
  date: string;
}

interface Body {
  coinbase: CoinbaseTransactions;
  transactions: [{}];
}

interface CoinbaseTransactions {
  tx_hash: string;
  coinbase_data: CoinbaseData;
  output: {};
  value: Decimal128;
}

interface CoinbaseData {
  block_len: number;
  merkel_root: string;
  reward: Decimal128;
}

export interface Admin {
  email: string;
  password: string;
}

export interface BlocksScan {
  bn: any;
  hash: any;
  transactions: any;
}

export interface Transaction {
  blockNumber: number;
  hash: string;
  from: string;
  to: string;
  value: Decimal128;
  fee: Decimal128;
  status: string;
  description: string;
  date: string;
}

export interface TrxScan {
  from: any;
  to: any;
  value: any;
  status: any;
  date: any;
}

export interface Relays {
  addr: string
}

export interface RPC {
  addr: string
}
