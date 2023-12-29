import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required and it should be unique!"],
  },
  password: {
    type: String,
    required: [false, "Password is required!"],
  },
});

const Account = models.Account || model("Account", AccountSchema);
export default Account;
