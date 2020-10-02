import * as express from "express";
import * as customerController from "../controllers/customerController";
export const customerRouter = express.Router();

//router.get("/", customerController.getAllCustomers);
customerRouter.post("/", customerController.createCustomer);
