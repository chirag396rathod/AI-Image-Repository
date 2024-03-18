import mongoose from "mongoose";
import Validator from "validator";

const registerEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email."],
      unique: true,
      lowercase: true,
      // validate: [isEmail, "Please enter a valid email."],
      validate: [Validator.default.isEmail, "Please enter a valid email."],
    },
  },
  { timestamps: { createdAt: "created _at" } }
);

export const registerEmail = mongoose.model(
  "nutfizzUsers",
  registerEmailSchema
);
