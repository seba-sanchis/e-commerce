import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required!"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "First name invalid, it should contain 3-20 alphanumeric letters!",
    ],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required!"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Last name invalid, it should contain 3-20 alphanumeric letters!",
    ],
  },
  dni: {
    type: Number,
    unique: [true, "DNI already exists!"],
    required: [true, "DNI is required and it should be unique!"],
  },
  birthday: {
    type: Date,
    required: [true, "Birthday is required!"],
  },
  region: {
    type: String,
    required: [true, "Region is required!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  postcode: {
    type: Number,
    required: [true, "Postcode is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required and it should be unique!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  areaCode: {
    type: Number,
    required: [true, "Area code is required!"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is required!"],
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
