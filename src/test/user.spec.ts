import * as request from "supertest";
import { app } from "../server";
import { user1 } from "./fixtures/users";
//import { userUpdated } from "./fixtures/users";
import { connection } from "../server";

let newid;

beforeAll(async () => {
  await connection;
});

/**
 * Testing create new customer endpoint
 */

describe("POST /users", () => {
  it("respond with json structure containing created user information", async (done) => {
    const response = await request(app)
      .post("/users")
      .send(user1)
      .expect("Content-Type", /json/)
      .expect(200);
    newid = response.body.id;
    console.log(response.body);
    done();
  });
});

describe("GET /users", () => {
  it("respond with json structure containing all shop users", async (done) => {
    await request(app).get("/users").expect("Content-Type", /json/).expect(200);
    done();
  });
});
