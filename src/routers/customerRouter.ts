import * as express from "express";
import * as customerController from "../controllers/customerController";
export const customerRouter = express.Router();

customerRouter.get("/", customerController.getAllCustomers);
customerRouter.post("/", customerController.createCustomer);
customerRouter.delete("/:id", customerController.deleteCustomer);
