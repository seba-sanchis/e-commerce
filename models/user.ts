import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [false, "First name is required!"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "First name invalid, it should contain 3-20 alphanumeric letters!",
    ],
  },
  lastName: {
    type: String,
    required: [false, "Last name is required!"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Last name invalid, it should contain 3-20 alphanumeric letters!",
    ],
  },
  dni: Number,
  birthday: {
    type: Date,
    required: [false, "Birthday is required!"],
  },
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
  postcode: {
    type: Number,
    required: [false, "Postcode is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required and it should be unique!"],
  },
  password: {
    type: String,
    required: [false, "Password is required!"],
  },
  areaCode: {
    type: Number,
    required: [false, "Area code is required!"],
  },
  phone: {
    type: Number,
    required: [false, "Phone is required!"],
  },
  bag: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  favorite: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
