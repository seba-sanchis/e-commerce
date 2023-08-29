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
  cart?: Item[];
  purchases?: Order[];
}

export interface Item {
  _id?: ObjectId;
  product: Product;
  quantity: number;
}

export interface Order {
  user: UserProfile;
  date: Date;
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
    firstName?: string | null;
    cart?: Item[] | null;
  };
}
