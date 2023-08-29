import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: [true, "Date is required!"],
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
