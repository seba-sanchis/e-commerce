import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  dni: {
    type: Number,
    unique: [true, "DNI already exists!"],
  },
  birthday: Date,
  region: String,
  location: String,
  address: String,
  postcode: Number,
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required and it should be unique!"],
  },
  image: String,
  areaCode: Number,
  phone: Number,
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
