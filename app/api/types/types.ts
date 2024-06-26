import { Decimal128 } from "mongodb";

export interface Post {
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
  blockhash: string,
  number: number,
  date: string
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
  bn: any,
  hash: any,
  transactions: any
}