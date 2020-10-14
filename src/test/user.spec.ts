import * as request from "supertest";
import { createApp } from "../server";
import { user1 } from "./fixtures/users";
import { userUpdated } from "./fixtures/users";
import { adminJWT } from "./fixtures/users";
import { userJWT } from "./fixtures/users";
import { Connection } from "typeorm";

let newid = 0;
let newidAdmin = 0;
let app;
let connection: Connection;

beforeAll(async () => {
  const { app: localApp, connection: localConnection } = await createApp();
  app = localApp;
  connection = localConnection;
});

afterAll(async () => await connection.close());

/**
 * Testing create new user endpoint
 */

describe("POST /users", () => {
  it("respond with json structure containing created user information", async () => {
    const { body, status } = await request(app)
      .post("/users")
      .field("username", user1.username)
      .field("password", user1.password)
      .field("role", user1.role)
      .auth(adminJWT, { type: "bearer" });
    expect(body.username).toEqual("user1");
    expect(body.role).toEqual("user");
    expect(status).toBe(200);
    newidAdmin = body.id;
  });
  it("respond with json structure containing 403 error because of a non admin privilege user trying to create new user", async () => {
    await request(app)
      .post("/users")
      .send(user1)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to create new user", async () => {
    await request(app).post("/users").send(user1).expect(401);
  });
});

/**
 * Testing get all users or just one user endpoint
 */
describe("GET /users", () => {
  it("respond with json structure containing all shop users", async () => {
    await request(app)
      .get("/users")
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to get all users information", async () => {
    await request(app).get("/users").expect("Content-Type", /json/).expect(401);
  });
  it("respond with json structure containing 403 error when a non admin privilege user tries to get all users information", async () => {
    await request(app)
      .get("/users")
      .auth(userJWT, { type: "bearer" })
      .expect(403);
  });
  it("respond with json structure containing one user information", async () => {
    await request(app)
      .get("/users/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to get one user's information", async () => {
    await request(app)
      .get("/users/" + newid)
      .expect(401);
  });
  it("respond with json structure containing 403 error when a non admin privilege user tries to get one user's information", async () => {
    await request(app)
      .get("/users/" + newid)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
  });
});

/**
 * Testing update one user endpoint
 */

describe("PATCH /users", () => {
  it("respond 200 status code if it updates correctly indicated user", async () => {
    await request(app)
      .patch("/users/" + newidAdmin)
      .field("username", userUpdated.username)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to update one user's information", async () => {
    await request(app)
      .patch("/users/" + newid)
      .send(userUpdated)
      .expect(401);
  });
  it("respond with json structure containing 403 error because of a non admin privilege user triying to update one user's information", async () => {
    await request(app)
      .patch("/users/" + newid)
      .send(userUpdated)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
  });
});

/**
 * Testing delete one user endpoint
 */

describe("DELETE /users", () => {
  it("respond with status 200 because of the deletion", async () => {
    await request(app)
      .delete("/users/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("respond with json structure containing 401 error when an unauthorized user tries to delete a user", async () => {
    await request(app)
      .delete("/users/" + newid)
      .expect(401);
  });
  it("respond with json structure containing 403 error because of a non admin privilege user triying to update one user's information", async () => {
    await request(app)
      .delete("/users/" + newid)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
  });
});
