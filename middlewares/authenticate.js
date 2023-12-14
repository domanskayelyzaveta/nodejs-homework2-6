import jwt from "jsonwebtoken";
import HttpError from "../helpers/httpError.js";
import User from "../models/User.js";
const { JWT_SECRET } = process.env;
import ctrlWrapper from "../decorators/controllerWrapper.js";

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
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return next(HttpError(401, error.message));
  }
};

export default ctrlWrapper(authenticate);
