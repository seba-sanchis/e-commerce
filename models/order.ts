import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  picked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pick",
    },
  ],
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
  payer: {
    type: Schema.Types.ObjectId,
    ref: "Payer",
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
  },
  installments: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
