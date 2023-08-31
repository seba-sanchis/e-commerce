import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
