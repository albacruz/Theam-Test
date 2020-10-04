import * as express from "express";
import * as customerController from "../controllers/customerController";
import { authenticateJWT } from "../middlewares/authentication";

export const customerRouter = express.Router();

customerRouter.post("/", authenticateJWT, customerController.createCustomer);
customerRouter.get("/", authenticateJWT, customerController.getAllCustomers);
customerRouter.get("/:id", authenticateJWT, customerController.getCustomer);
customerRouter.put("/:id", authenticateJWT, customerController.updateCustomer);
customerRouter.delete(
  "/:id",
  authenticateJWT,
  customerController.deleteCustomer
);
