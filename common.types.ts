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
  items: Item[];
  payment: {
    id: string;
    type: string;
  };
  installments: number;
  transaction: {
    bank: number;
    installment: number;
    paid: number;
    received: number;
    overpaid: number;
  };
  payer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    identification: string;
    phone: {
      area_code: string;
      number: string;
      extension?: string | undefined;
    };
  };
  reference: string;
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
