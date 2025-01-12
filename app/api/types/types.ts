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
  header: BlockHeader;
  body: {
    coinbase: CoinbaseTransactions;
    transactions: Array<BaseTransaction>;
  };
}

interface BlockHeader {
  number: number;
  hash: string;
  previous: string;
  validator: string;
  relay: string;
  merkel: string;
  signature: Signature;
  date: string;
}

export interface CoinbaseTransactions {
  hash: string;
  merkel: string;
  size: number;
  data: {
    reward: BaseTransaction;
    fees: string;
    relay_wallet: string;
    relay_fee: BaseTransaction;
    validator_fee: BaseTransaction;
  };
}

export interface Admin {
  email: string;
  password: string;
}

export interface BaseTransaction {
  hash: string;
  data: TransactionData;
  sign: Signature;
  date: string;
}

interface TransactionData {
  from: string;
  to: string;
  value: string;
  fee: string;
  salt: number;
}

interface Signature {
  signatgure: string; // Note: Keeping the misspelling as it appears in the data
  key: string;
}

export interface TrxScan {
  hash: string;
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
