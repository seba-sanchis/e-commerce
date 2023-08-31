import { Schema, model, models } from "mongoose";

const PhoneSchema = new Schema({
  areaCode: String,
  number: String,
  extension: String,
});

const Phone = models.Phone || model("Phone", PhoneSchema);

export default Phone;
