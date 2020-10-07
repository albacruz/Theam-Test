import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import { customerRouter } from "./routers/customerRouter";
import { userRouter } from "./routers/userRouter";
import { authRouter } from "./routers/authRouter";
import { createConnection } from "typeorm";
import * as fileupload from "express-fileupload";
import * as dotenv from "dotenv";
dotenv.config();

export const app = express();

export const connection = createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env["DATABASE_USER_NAME"],
  password: process.env["DATABASE_PASSWORD"],
  database: process.env["DATABASE_NAME"],
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
})
  .then(() => console.log("Connected to db"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(fileupload({ useTempFiles: true }));

app.use("/customers", customerRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
