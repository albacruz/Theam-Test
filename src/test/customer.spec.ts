import * as request from "supertest";
import { createApp } from "../server";
import { User } from "../entities/User";
import { Connection } from "typeorm";
import { customer1 } from "./fixtures/customers";
import { customerUpdated } from "./fixtures/customers";
import { adminJWT } from "./fixtures/users";
import { userJWT } from "./fixtures/users";
import { Role } from "../entities/User";

let newid = 0,
  createdIdByAdmin = 0,
  createdIdByUser = 0;

async function createAdmin(connection: Connection) {
  const newUserAdmin = new User();
  newUserAdmin.username = "albacruz";
  newUserAdmin.password = "1234";
  newUserAdmin.role = "admin" as Role;

  await connection.manager.save(newUserAdmin);
}

async function createUser(connection: Connection) {
  const newUser = new User();
  newUser.username = "aaronperez";
  newUser.password = "1234";
  newUser.role = "user" as Role;

  await connection.manager.save(newUser);
}

let app;
let connection: Connection;

beforeAll(async () => {
  const { app: localApp, connection: localConnection } = await createApp();
  app = localApp;
  connection = localConnection;
  await createAdmin(localConnection);
  await createUser(localConnection);
});

afterAll(async () => {
  await connection.manager.query(`
      TRUNCATE customer RESTART IDENTITY CASCADE;
      TRUNCATE "user" RESTART IDENTITY CASCADE;
    `);
  await connection.close();
});

/**
 * Testing create new customer endpoint
 */

describe("POST /customers", () => {
  it("responds with json structure containing created customer information when an admin creates it", async () => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    const { body, status } = await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .auth(adminJWT, { type: "bearer" });
    createdIdByAdmin = body.id;
    expect(body.surname).toEqual("Cruz");
    expect(body.name).toEqual("Alba");
    expect(body.photo).toMatch("cloudinary.com");
    expect(status).toBe(200);
  });

  it("responds with json structure containing created customer information when a user creates it", async () => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    const { body, status } = await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .auth(userJWT, { type: "bearer" });
    createdIdByUser = body.id;
    expect(body.name).toEqual("Alba");
    expect(body.surname).toEqual("Cruz");
    expect(body.photo).toMatch("cloudinary.com");
    expect(status).toBe(200);
  });

  it("responds with json structure containing 401 error because of an unauthorized user triying to create a customer", async () => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .expect(401);
  });
});

/**
 * Testing get all customers or just one customer endpoint
 */

describe("GET /customers", () => {
  it("responds with json structure containing all shop customers when admin calls endpoint", async () => {
    await request(app)
      .get("/customers")
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("responds with json structure containing one customer information when admin calls endpoint", async () => {
    await request(app)
      .get("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("responds with json structure containing all shop customers when user calls endpoint", async () => {
    await request(app)
      .get("/customers")
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("responds with json structure containing one customer information when user calls endpoint", async () => {
    await request(app)
      .get("/customers/" + createdIdByUser)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("responds with json structure containing 401 error because of an unauthorized user trying to get one customer information", async () => {
    await request(app)
      .get("/customers/" + newid)
      .expect("Content-Type", /json/)
      .expect(401);
  });
  it("responds with json structure containing 401 error because of unauthorized user trying to get all customers information", async () => {
    await request(app)
      .get("/customers")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

/**
 * Testing update one customer endpoint
 */

describe("PATCH /customers", () => {
  it("responds 200 status code if it updates correctly indicated customer when admin calls endpoint", async () => {
    await request(app)
      .patch("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .send(customerUpdated)
      .expect(200);
  });
  it("responds 200 status code if it updates correctly indicated customer when user calls endpoint", async () => {
    await request(app)
      .patch("/customers/" + createdIdByUser)
      .auth(userJWT, { type: "bearer" })
      .send(customerUpdated)
      .expect(200);
  });
  it("responds with json structure containign 401 error when an unauthorized user tries to update a customer", async () => {
    await request(app)
      .patch("/customers/" + newid)
      .send(customerUpdated)
      .expect(401);
  });
});

/**
 * Testing delete one customer endpoint
 */

describe("DELETE /customers", () => {
  it("responds with status 200 because of the deletion when admin calls endpoint", async () => {
    await request(app)
      .delete("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("responds with status 200 because of the deletion when user calls endpoint", async () => {
    await request(app)
      .delete("/customers/" + createdIdByUser)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
  });
  it("responds with json structure containing 401 error when an unauthorized user tries to delete a customer", async () => {
    await request(app)
      .delete("/customers/" + newid)
      .expect(401);
  });
});
