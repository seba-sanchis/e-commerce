import { Schema, model, models } from "mongoose";

const ShippingSchema = new Schema({
  region: {
    type: String,
    required: [false, "Region is required!"],
  },
  location: {
    type: String,
    required: [false, "Location is required!"],
  },
  address: {
    type: String,
    required: [false, "Address is required!"],
  },
  zip: {
    type: String,
    required: [false, "Zip is required!"],
  },
  areaCode: {
    type: String,
    required: [false, "Area code is required!"],
  },
  phone: {
    type: String,
    required: [false, "Phone is required!"],
  },
});

const Shipping = models.Shipping || model("Shipping", ShippingSchema);
export default Shipping;
