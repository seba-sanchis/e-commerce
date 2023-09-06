import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  sku: {
    type: String,
    unique: [true, "SKU already exists!"],
    required: [true, "SKU is required and it should be unique!"],
  },
  category: {
    type: String,
    required: [true, "Categoty is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required!"],
  },
  image: {
    type: String,
    required: [true, "Image is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  features: [
    {
      type: String,
      required: [true, "Features is required!"],
    },
  ],
  colors: {
    type: String,
    required: [true, "Colors is required!"],
  },
  sizes: [
    {
      type: String,
    },
  ],
  stock: [
    {
      type: Number,
      required: [true, "Stock is required!"],
    },
  ],
  sold: [
    {
      type: Number,
      required: [true, "Sold is required!"],
    },
  ],
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
