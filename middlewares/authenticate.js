import jwt from "jsonwebtoken";
import HttpError from "../helpers/httpError.js";
import dotenv from "dotenv";
import User from "../models/User.js";
import ctrlWrapper from "../decorators/controllerWrapper.js";

dotenv.config();

const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Authorization headers not define");
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log(JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
