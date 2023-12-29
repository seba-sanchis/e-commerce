import { Schema, model, models } from "mongoose";

const PrivacySchema = new Schema({
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
});

const Privacy = models.Privacy || model("Privacy", PrivacySchema);
export default Privacy;
