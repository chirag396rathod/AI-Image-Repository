import { User } from "../mongodb/models/userModel.js";
import { registerEmail } from "../mongodb/models/registerEmailModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// handle error
const handleErrors = (err) => {
  const { message, code, errors } = err;
  let errorMessage = {};
  if (code === 11000) {
    errorMessage.error = "that email is already registered.";
    return errorMessage;
  }
  if (message.includes("user validation failed")) {
    Object.values(errors).forEach(({ properties }) => {
      errorMessage[properties.path] = properties.message;
    });
  }
  return errorMessage;
};

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const SignupPost = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    const jwt = createToken(user._id);
    res.status(201).json({
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      jwttoken: jwt,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const RegisteredPost = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await registerEmail.create({
      email,
    });
    res.status(201).json({
      message: "You are register successfully!",
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const SigninPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);

      if (auth) {
        const jwt = createToken(user._id);
        res.status(201).json({
          user: {
            email: user.email,
            name: user.name,
            id: user.id,
          },
          jwttoken: jwt,
        });
      } else {
        res.status(400).json({ error: "Enter a valid password!" });
      }
    } else {
      res.status(400).json({ error: "User not found!" });
    }
  } catch (error) {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    console.log(error);
  }
};
export { SignupPost, SigninPost, RegisteredPost };
