import * as express from "express";
import * as authController from "../controllers/authController";
export const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);
