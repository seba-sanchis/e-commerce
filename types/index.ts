import { ObjectId } from "mongoose";
import type { Session } from "next-auth";

export interface Account {
  _id?: ObjectId;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}

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
  size: string;
}

export interface Order {
  _id?: ObjectId;
  orderId: string;
  date: string;
  status: string;
  picked?: Picked[];
  payment?: Payment;
  payer?: Payer;
  transaction?: Transaction;
  installments: number;
  reference: string;
}

export interface Payer {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  identification: string;
  phone?: Phone;
}

export interface Payment {
  _id?: ObjectId;
  company: string;
  type: string;
}

export interface Phone {
  _id?: ObjectId;
  areaCode: string;
  number: string;
  extension?: string;
}

export interface Picked {
  _id?: ObjectId;
  category: string;
  description: string;
  sku: string;
  thumbnail: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Privacy {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  dni: string;
  birthday: string;
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
  user: {
    id: string;
    name?: string;
    image?: string;
    email: string;
    bag: Item[];
    favorite: Product[];
  };
}

export interface Shipping {
  _id?: ObjectId;
  region: string;
  location: string;
  address: string;
  zip: string;
  areaCode: string;
  phone: string;
}

export interface Transaction {
  _id?: ObjectId;
  bank: string;
  installment: number;
  paid: number;
  received: number;
  overpaid: number;
}

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
  confirmPassword?: string;

  firstName: string;
  lastName: string;
  dni: string;
  birthday: string;

  region: string;
  location: string;
  address: string;
  zip: string;
  areaCode: string;
  phone: string;

  bag?: Item[];
  favorite?: Product[];
  purchases?: {
    orderId: string;
    date: string;
    status: string;
    picked: Picked[];
    payment: Payment;
    payer: Payer;
    transaction: Transaction;
    installments: number;
    reference: string;
  }[];
}

export interface Validation {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  dni?: string;
  birthday?: string;
  region?: string;
  location?: string;
  address?: string;
  zip?: string;
  areaCode?: string;
  phone?: string;
}
