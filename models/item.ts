import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required!"],
  },
  size: {
    type: String,
  },
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;
