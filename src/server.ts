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

export async function createApp() {
  const app = express();

  const connection = await createConnection(ormconfig)
    .then((connection) => {
      console.log("Connected to db");
      return connection;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
  app.use(fileupload({ useTempFiles: true }));
  app.use(xss());
  app.use(helmet());

  app.use("/customers", customerRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);

  return { app, connection };
}
