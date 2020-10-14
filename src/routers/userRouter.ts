import * as express from "express";
import * as userController from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authentication";
export const userRouter = express.Router();

userRouter.post("/", authenticateJWT, userController.createUser);
userRouter.get("/", authenticateJWT, userController.getAllUsers);
userRouter.get("/:id", authenticateJWT, userController.getUser);
userRouter.delete("/:id", authenticateJWT, userController.deleteUser);
userRouter.patch("/:id", authenticateJWT, userController.updateUser);
