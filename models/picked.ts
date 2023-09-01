import { Schema, model, models } from "mongoose";

const PickedSchema = new Schema({
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

const Picked = models.Picked || model("Picked", PickedSchema);

export default Picked;
