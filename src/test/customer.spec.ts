import * as request from "supertest";
import { app } from "../server";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { connection } from "../server";
import { customer1 } from "./fixtures/customers";
import { customerUpdated } from "./fixtures/customers";
import { adminJWT } from "./fixtures/users";
import { userJWT } from "./fixtures/users";
import { Role } from "../entities/User";

let newid = 0,
  createdIdByAdmin = 0,
  createdIdByUser = 0;

let newUserAdmin, newUser;

async function createAdmin() {
  newUserAdmin = new User();
  newUserAdmin.username = "albacruz";
  newUserAdmin.password = "1234";
  newUserAdmin.role = "admin" as Role;

  const responseAdmin = await getConnection().manager.save(newUserAdmin);
  newUserAdmin = responseAdmin;
  console.log("admin", responseAdmin);
}

async function createUser() {
  newUser = new User();
  newUser.username = "aaronperez";
  newUser.password = "1234";
  newUser.role = "user" as Role;

  const responseUser = await getConnection().manager.save(newUser);
  newUser = responseUser;
}

beforeAll(async () => {
  await connection;
  await createAdmin();
  await createUser();
});

afterAll(async () => {
  await getConnection().manager.delete(User, newUserAdmin);
  await getConnection().manager.delete(User, newUser);
  await getConnection().manager.query(`
    TRUNCATE customer RESTART IDENTITY CASCADE;
    TRUNCATE "user" RESTART IDENTITY CASCADE;
  `);
});
/**
 * Testing create new customer endpoint
 */

describe("POST /customers", () => {
  it("responds with json structure containing created customer information when an admin creates it", async (done) => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    const response = await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    createdIdByAdmin = response.body.id;
    console.log(response.body);
    done();
  });

  it("responds with json structure containing created customer information when a user creates it", async (done) => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    const response = await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    createdIdByUser = response.body.id;
    console.log(response.body);
    done();
  });

  it("responds with json structure containing 401 error because of an unauthorized user triying to create a customer", async (done) => {
    const filePath = `${__dirname}/fixtures/testPicture.png`;
    await request(app)
      .post("/customers")
      .attach("photo", filePath)
      .field("name", customer1.name)
      .field("surname", customer1.surname)
      .expect(401);
    done();
  });
});

/**
 * Testing get all customers or just one endpoint
 */

describe("GET /customers", () => {
  it("responds with json structure containing all shop customers when admin calls endpoint", async (done) => {
    await request(app)
      .get("/customers")
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("responds with json structure containing one customer information when admin calls endpoint", async (done) => {
    await request(app)
      .get("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });

  it("responds with json structure containing all shop customers when user calls endpoint", async (done) => {
    await request(app)
      .get("/customers")
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("responds with json structure containing one customer information when user calls endpoint", async (done) => {
    await request(app)
      .get("/customers/" + createdIdByUser)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("responds with json structure containing 401 error because of an unauthorized user trying to get one customer information", async (done) => {
    await request(app)
      .get("/customers/" + newid)
      .expect("Content-Type", /json/)
      .expect(401);
    done();
  });
  it("responds with json structure containing 401 error because of unauthorized user trying to get all customers information", async (done) => {
    await request(app)
      .get("/customers")
      .expect("Content-Type", /json/)
      .expect(401);
    done();
  });
});

/**
 * Testing update one customer endpoint
 */

describe("PUT /customers", () => {
  it("responds 200 status code if it updates correctly indicated customer when admin calls endpoint", async (done) => {
    await request(app)
      .put("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .send(customerUpdated)
      .expect(200);
    done();
  });
  it("responds 200 status code if it updates correctly indicated customer when user calls endpoint", async (done) => {
    await request(app)
      .put("/customers/" + createdIdByUser)
      .auth(userJWT, { type: "bearer" })
      .send(customerUpdated)
      .expect(200);
    done();
  });
  it("responds with json structure containign 401 error when an unauthorized user tries to update a customer", async (done) => {
    await request(app)
      .put("/customers/" + newid)
      .send(customerUpdated)
      .expect(401);
    done();
  });
});

/**
 * Testing delete one customer endpoint
 */

describe("DELETE /customers", () => {
  it("responds with status 200 because of the deletion when admin calls endpoint", async (done) => {
    await request(app)
      .delete("/customers/" + createdIdByAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
    done();
  });
  it("responds with status 200 because of the deletion when user calls endpoint", async (done) => {
    await request(app)
      .delete("/customers/" + createdIdByUser)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
    done();
  });
  it("responds with json structure containing 401 error when an unauthorized user tries to delete a customer", async (done) => {
    await request(app)
      .delete("/customers/" + newid)
      .expect(401);
    done();
  });
});
