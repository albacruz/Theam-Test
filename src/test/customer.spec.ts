import * as request from "supertest";
import { app } from "../server";
import { customer1 } from "./fixtures/customers";
import { customerUpdated } from "./fixtures/customers";
import { connection } from "../server";

let newid;

beforeAll(async () => {
  await connection;
});

/**
 * Testing create new customer endpoint
 */

describe("POST /customers", () => {
  it("respond with json structure containing created customer information", async (done) => {
    const response = await request(app)
      .post("/customers")
      .send(customer1)
      .expect("Content-Type", /json/)
      .expect(200);
    newid = response.body.id;
    console.log(response.body);
    done();
  });
});

/**
 * Testing get all customers or just one endpoint
 */

describe("GET /customers", () => {
  it("respond with json structure containing all shop customers", async (done) => {
    await request(app)
      .get("/customers")
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
  it("respond with json structure containing one customer information", async (done) => {
    await request(app)
      .get("/customers/" + newid)
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

/**
 * Testing update one customer endpoint
 */

describe("PUT /customers", () => {
  it("respond 200 status code if it updates correctly indicated customer", async (done) => {
    await request(app)
      .put("/customers/" + newid)
      .send(customerUpdated)
      .expect(200);
    done();
  });
});

/**
 * Testing delete one customer endpoint
 */

describe("DELETE /customers", () => {
  it("respond with status 200 because of the deletion", async (done) => {
    await request(app)
      .delete("/customers/" + newid)
      .expect(200);
    done();
  });
});
