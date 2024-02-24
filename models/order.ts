import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  picked: [
    {
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
    },
  ],
  payment: {
    company: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  payer: {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
    },
    phone: {
      areaCode: String,
      number: String,
      extension: String,
    },
  },
  transaction: {
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
