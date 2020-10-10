import { ConnectionOptions } from "typeorm";

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  host: process.env["DATABASE_HOST"],
  port: 5432,
  username: process.env["TYPEORM_USERNAME"],
  password: process.env["TYPEORM_PASSWORD"],
  database: process.env["TYPEORM_DATABASE"],
  synchronize: true,
  logging: false,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migration/**/*.ts"],
  subscribers: ["./src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "./src/entities",
    migrationsDir: "./src/migration",
    subscribersDir: "./src/subscriber",
  },
};
