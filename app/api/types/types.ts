import { Decimal128, ObjectId } from "mongodb";

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  type: string;
  description: string;
  image: string;
  createdAt: string | Date;
  author?: string;
}

export interface Block {
  header: Header;
  body: Body;
}

interface Header {
  hash: string;
  number: number;
  date: string;
}

interface Body {
  coinbase: CoinbaseTransactions;
  transactions: [{}];
}

interface CoinbaseTransactions {
  tx_hash: string;
  size: number;
  merkel_root: string;
  reward: Decimal128;
  output: {};
  fee: Decimal128;
}

export interface Admin {
  email: string;
  password: string;
}

export interface BlocksScan {
  header: {
    number: number;
    hash: string;
    previous: string;
    validator: string;
    relay: string;
    merkel: string;
    signature: {
      signatgure: string;
      key: string;
    };
    date: string;
  };
  body: {
    coinbase: {
      hash: string;
      size: number;
      merkel: string;
      reward: string;
      output: {};
      fees: string;
      relay_fee: string;
      validator_fee: string;
    };
    transactions: Array<{
      hash: string;
      input: {
        hash: string;
        number: number;
        utxos: Array<{
          block: number;
          trx_hash: string;
          output_hash: string;
          unspent_hash: string;
          unspent: string;
        }>;
      };
      output: {
        hash: string;
        number: number;
        unspents: Array<{
          hash: string;
          data?: {
            wallet: string;
            salt: number;
            value: string;
          };
        }>;
      };
      value?: string;
      fee?: string;
      script?: string;
      signature: Array<any>;
      date: string;
    }>;
  };
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
  addr: string;
}

export interface RPC {
  addr: string;
}
