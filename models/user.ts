import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  // Account
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required and it should be unique!"],
  },
  password: {
    type: String,
    required: [false, "Password is required!"],
  },

  // Privacy
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
  dni: {
    type: String,
    required: [false, "DNI is required!"],
  },
  birthday: {
    type: Date,
    required: [false, "Birthday is required!"],
  },

  // Shipping
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

  // Sales
  bag: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required!"],
      },
      size: {
        type: String,
      },
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
