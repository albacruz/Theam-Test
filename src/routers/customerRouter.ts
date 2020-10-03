import * as express from "express";
import * as customerController from "../controllers/customerController";
export const customerRouter = express.Router();

customerRouter.post("/", customerController.createCustomer);
customerRouter.get("/", customerController.getAllCustomers);
customerRouter.get("/:id", customerController.getCustomer);
customerRouter.put("/:id", customerController.updateCustomer);
customerRouter.delete("/:id", customerController.deleteCustomer);
