import { Schema, model, models } from "mongoose";

const PickSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: String, // Optional description field
  sku: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Pick = models.Pick || model("Pick", PickSchema);

export default Pick;
