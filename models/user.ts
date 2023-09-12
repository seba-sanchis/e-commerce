import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [false, "Name is required!"],
    match: [
      /^(?=.{6,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._\s]+(?<![_.])$/,
      "Name invalid, it should contain 6-32 alphanumeric letters!",
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
    required: [false, "Email is required and it should be unique!"],
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
