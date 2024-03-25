import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  loginSchema,
  registerSchema,
  subscriptSchema,
} from "../schemas/contactsSchemas.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateSubscript,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(registerSchema),
  ctrlWrapper(register)
);

userRouter.post("/login", validateBody(loginSchema), ctrlWrapper(login));

userRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

userRouter.post("/logout", authenticate, ctrlWrapper(logout));

userRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptSchema),
  ctrlWrapper(updateSubscript)
);

export default userRouter;
