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

let newid = 0;
let newidAdmin = 0;
let newidUser = 0;
let newUserAdmin;
let newUser;

beforeAll(async () => {
  await connection;
  newUserAdmin = new User();
  newUserAdmin.username = "albacruz";
  newUserAdmin.password = "1234";
  newUserAdmin.role = "admin" as Role;

  await getConnection()
    .manager.save(newUserAdmin)
    .then(() => {
      console.log("Test admin correctly created");
    })
    .catch((error) => console.log(error));

  newUser = new User();
  newUser.username = "aaronperez";
  newUser.password = "1234";
  newUser.role = "user" as Role;

  await getConnection()
    .manager.save(newUser)
    .then(() => {
      console.log("Test user correctly created");
    })
    .catch((error) => console.log(error));
});

afterAll(async () => {
  await getConnection()
    .manager.delete(User, newUserAdmin)
    .then(() => {
      console.log("Test admin correctly deleted");
    })
    .catch((error) => console.log(error));

  await getConnection()
    .manager.delete(User, newUser)
    .then(() => {
      console.log("Test admin correctly deleted");
    })
    .catch((error) => console.log(error));
});
/**
 * Testing create new customer endpoint
 */

describe("POST /customers", () => {
  it("responds with json structure containing created customer information when an admin creates it", async (done) => {
    const response = await request(app)
      .post("/customers")
      .send(customer1)
      .auth(adminJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    newidAdmin = response.body.id;
    console.log(response.body);
    done();
  });

  it("responds with json structure containing created customer information when a user creates it", async (done) => {
    const response = await request(app)
      .post("/customers")
      .send(customer1)
      .auth(userJWT, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    newidUser = response.body.id;
    console.log(response.body);
    done();
  });

  it("responds with json structure containing 401 error because of an unauthorized user triying to create a customer", async (done) => {
    await request(app).post("/customers").send(customer1).expect(401);
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
      .get("/customers/" + newidAdmin)
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
      .get("/customers/" + newidUser)
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
      .put("/customers/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .send(customerUpdated)
      .expect(200);
    done();
  });
  it("responds 200 status code if it updates correctly indicated customer when user calls endpoint", async (done) => {
    await request(app)
      .put("/customers/" + newidUser)
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
      .delete("/customers/" + newidAdmin)
      .auth(adminJWT, { type: "bearer" })
      .expect(200);
    done();
  });
  it("responds with status 200 because of the deletion when user calls endpoint", async (done) => {
    await request(app)
      .delete("/customers/" + newidUser)
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
