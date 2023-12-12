import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import { userSignInSchema, userSignUpSchema } from "../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignUpSchema),
  authControllers.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSignInSchema),
  authControllers.signin
);

// authRouter.post("/logout", isEmptyBody, validateBody())

export default authRouter;
