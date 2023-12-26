import type { ObjectId } from "mongodb";
import type { Session } from "next-auth";

export interface Content {
  _id?: ObjectId;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  tag: string;
  lastUpdated: Date;
}

export interface Item {
  _id?: ObjectId;
  product: Product;
  quantity: number;
  size?: string;
}

export interface Order {
  _id?: ObjectId;
  orderId: string | undefined;
  date: string | undefined;
  status: string | undefined;
  picked?: Picked[];
  payment?: Payment;
  payer?: Payer;
  transaction?: Transaction;
  installments: number | undefined;
  reference: string | undefined;
}

export interface Payment {
  _id?: ObjectId;
  company: string | undefined;
  type: string | undefined;
}

export interface Payer {
  _id?: ObjectId;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  identification: string | undefined;
  phone?: Phone;
}

export interface Phone {
  _id?: ObjectId;
  areaCode: string | undefined;
  number: string | undefined;
  extension?: string | undefined;
}

export interface Picked {
  _id?: ObjectId;
  category: string | undefined;
  description: string | undefined;
  sku: string;
  thumbnail: string | undefined;
  quantity: number;
  name: string;
  price: number;
}

export interface Transaction {
  _id?: ObjectId;
  bank: string | undefined;
  installment: number | undefined;
  paid: number | undefined;
  received: number | undefined;
  overpaid: number | undefined;
}

export interface Product {
  _id?: ObjectId;
  sku: string;
  category: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  color: string;
  sizes: string[];
  stock: number[];
  sold: number[];
  price: number;
}

export interface Sessions extends Session {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    dni?: number | null;
    bag?: Item[] | null;
    items?: number | null;
    favorite?: Product[] | null;
  };
}

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
  favorite?: Product[];
  purchases?: Order[];
}
