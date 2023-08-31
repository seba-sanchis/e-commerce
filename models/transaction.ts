import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  bank: String,
  installment: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  received: {
    type: Number,
    required: true,
  },
  overpaid: {
    type: Number,
    required: true,
  },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
