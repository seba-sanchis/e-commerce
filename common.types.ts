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
  installments: number;
  reference: string;
  items: Item[];
  payment: Payment;
  payer: Payer;
  transaction: Transaction;
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

export interface Transaction {
  _id?: ObjectId;
  bank: number;
  installment: number;
  paid: number;
  received: number;
  overpaid: number;
}

export interface Phone {
  _id?: ObjectId;
  area_code: string;
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
