import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  privacy: {
    type: Schema.Types.ObjectId,
    ref: "Privacy",
  },
  shipping: {
    type: Schema.Types.ObjectId,
    ref: "Shipping",
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
