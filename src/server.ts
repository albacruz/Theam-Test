import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import { customerRouter } from "./routers/customerRouter";
import { userRouter } from "./routers/userRouter";
import { authRouter } from "./routers/authRouter";
import { createConnection } from "typeorm";
import * as fileupload from "express-fileupload";
import * as dotenv from "dotenv";
import * as xss from "xss-clean";
import * as helmet from "helmet";
import { ormconfig } from "../ormconfig";

dotenv.config();

export const app = express();

export const connection = createConnection(ormconfig)
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log(error));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(fileupload({ useTempFiles: true }));
app.use(xss());
app.use(helmet());

app.use("/customers", customerRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
