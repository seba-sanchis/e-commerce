import { PreferenceItem } from "mercadopago/models/preferences/create-payload.model";
import type { ObjectId } from "mongodb";
import type { Session } from "next-auth";

export interface UserProfile {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  dni: number;
  birthday: string;
  region: string;
  location: string;
  address: string;
  postcode: number;
  email: string;
  password: string;
  areaCode: number;
  phone: number;
  bag?: Item[];
  purchases?: Order[];
}

export interface Item {
  _id?: ObjectId;
  product: Product;
  quantity: number;
}

export interface Order {
  _id?: ObjectId;
  orderId: string;
  date: string;
  status: string;
  picked: Pick[];
  payment: Payment;
  payer: Payer;
  transaction: Transaction;
  installments: number;
  reference: string;
}

export interface Payment {
  _id?: ObjectId;
  company: string;
  type: string;
}

export interface Payer {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  identification: string;
  phone: Phone;
}

export interface Pick {
  _id?: ObjectId;
  category: string;
  description: string;
  sku: string;
  thumbnail: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Transaction {
  _id?: ObjectId;
  bank: string;
  installment: number;
  paid: number;
  received: number;
  overpaid: number;
}

export interface Phone {
  _id?: ObjectId;
  areaCode: string;
  number: string;
  extension?: string | undefined;
}

export interface Product {
  _id?: ObjectId;
  sku: string;
  category: string;
  name: string;
  thumbnail: string;
  image: string;
  description: string;
  features: string[];
  price: number;
  stock: number;
  sold: number;
}

export interface Sessions extends Session {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    dni?: number | null;
    bag?: Item[] | null;
  };
}
