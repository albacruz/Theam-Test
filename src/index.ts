import "reflect-metadata";

import * as express from "express";
import * as morgan from "morgan";
import { customerRouter } from "./routers/customerRouter";
import { createConnection } from "typeorm";

export const app = express();

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "albacruz",
  password: "pwd0123456789",
  database: "theamshop",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
})
  .then(() => console.log("conectado"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/customers", customerRouter);

app.set("port", process.env.PORT || 3000);
const port = app.get("port");
app.listen(port, () => console.log(`Listening on port ${port}!`));
