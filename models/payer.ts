import { Schema, model, models } from "mongoose";

const PayerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  identification: {
    type: String,
    required: true,
  },
  phone: {
    type: Schema.Types.ObjectId,
    ref: "Phone",
  },
});

const Payer = models.Payer || model("Payer", PayerSchema);

export default Payer;
