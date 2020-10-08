import * as request from "supertest";
import { app } from "../server";
import { user1 } from "./fixtures/users";
import { userUpdated } from "./fixtures/users";
import { adminJWT } from "./fixtures/users";
import { userJWT } from "./fixtures/users";
import { connection } from "../server";

let newid = 0;
let newidAdmin = 0;

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
      .field("username", user1.username)
      .field("password", user1.password)
      .field("role", user1.role)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    newidAdmin = response.body.id;
    console.log("Respuesta", response.body);
    done();
  });
  it("respond with json structure containing 403 error because of a non admin privilege user trying to create new user", async (done) => {
    await request(app)
      .post("/users")
      .send(user1)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(403);
    done();
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to create new user", async (done) => {
    await request(app)
      .post("/users")
      .send(user1)
      .expect("Content-Type", /json/)
      .expect(401);
    done();
  });
});

/**
 * Testing get all users or just one endpoint
 */
describe("GET /users", () => {
  it("respond with json structure containing all shop users", async (done) => {
    await request(app)
      .get("/users")
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to get all users information", async (done) => {
    await request(app).get("/users").expect("Content-Type", /json/).expect(401);
    done();
  });
  it("respond with json structure containing 403 error when a non admin privilege user tries to get all users information", async (done) => {
    await request(app)
      .get("/users")
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(403);
    done();
  });
  it("respond with json structure containing one user information", async (done) => {
    await request(app)
      .get("/users/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to get one user's information", async (done) => {
    await request(app)
      .get("/users/" + newid)
      .expect("Content-Type", /json/)
      .expect(401);
    done();
  });
  it("respond with json structure containing 403 error when a non admin privilege user tries to get one user's information", async (done) => {
    await request(app)
      .get("/users/" + newid)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(403);
    done();
  });
});

/**
 * Testing update one user endpoint
 */

describe("PUT /users", () => {
  it("respond 200 status code if it updates correctly indicated user", async (done) => {
    await request(app)
      .put("/users/" + newidAdmin)
      .field("username", userUpdated.username)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
    done();
  });
  it("respond with json structure containing 401 error because of an unauthorized user triying to update one user's information", async (done) => {
    await request(app)
      .put("/users/" + newid)
      .send(userUpdated)
      .expect(401);
    done();
  });
  it("respond with json structure containing 403 error because of a non admin privilege user triying to update one user's information", async (done) => {
    await request(app)
      .put("/users/" + newid)
      .send(userUpdated)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
    done();
  });
});

/**
 * Testing delete one user endpoint
 */

describe("DELETE /users", () => {
  it("respond with status 200 because of the deletion", async (done) => {
    await request(app)
      .delete("/users/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
    done();
  });
  it("respond with json structure containing 401 error when an unauthorized user tries to delete a user", async (done) => {
    await request(app)
      .delete("/users/" + newid)
      .expect(401);
    done();
  });
  it("respond with json structure containing 403 error because of a non admin privilege user triying to update one user's information", async (done) => {
    await request(app)
      .delete("/users/" + newid)
      .auth(userJWT, { type: "bearer" })
      .expect(403);
    done();
  });
});
