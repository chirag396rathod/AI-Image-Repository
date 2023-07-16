import mongoose from "mongoose";
import Validator from "validator";
import bcrypt from "bcrypt";

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
    // validate: [isEmail, "Please enter a valid email."],
    validate: [Validator.default.isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter an password."],
    minLength: [6, "Minimum password length is 6 charactrrs"],
    maxLength: [12, "Minimum password length is 12 charactrrs"],
  },
});

// fire a function before doc saved to db
userShema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// fire a function after doc saved to db

export const User = mongoose.model("user", userShema);
