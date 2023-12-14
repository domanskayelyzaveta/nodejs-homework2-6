import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";
import addUpdateSetting from "../helpers/addUpdateSettings.js";

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
userSchema.pre("findOneAndUpdate", addUpdateSetting);
userSchema.post("findOneAndUpdate", handleMongooseError);

export const userSignUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

export default User;
