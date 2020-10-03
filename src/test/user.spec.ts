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
 * Testing create new user endpoint
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

/**
 * Testing get all users or just one endpoint
 */
describe("GET /users", () => {
  it("respond with json structure containing all shop users", async (done) => {
    await request(app).get("/users").expect("Content-Type", /json/).expect(200);
    done();
  });
  it("respond with json structure containing one user information", async (done) => {
    await request(app)
      .get("/users/" + newid)
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

/**
 * Testing delete one user endpoint
 */

describe("DELETE /users", () => {
  it("respond with status 200 because of the deletion", async (done) => {
    await request(app)
      .delete("/users/" + newid)
      .expect(200);
    done();
  });
});
