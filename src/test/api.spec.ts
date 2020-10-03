import * as request from "supertest";
import { app } from "../server";
import { customer1 } from "./fixtures/customers";
import { connection } from "../server";

beforeAll(async () => {
  await connection;
});
/**
 * Testing get all customers endpoint
 */

describe("GET /customers", () => {
  it("respond with json structure containing all shop customers", async (done) => {
    await request(app)
      .get("/customers")
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
});

/**
 * Testing get one customer endpoint
 */

describe("GET /customers", () => {
  it("respond with json structure containing one customer information", async (done) => {
    await request(app)
      .get("/customers/" + 2)
      .expect("Content-Type", /json/)
      .expect(200);
    done();
  });
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
    console.log(response.body);
    done();
  });
});

describe("DELETE /customers", () => {
  it("respond with status 200 because of the deletion", async (done) => {
    await request(app)
      .delete("/customers/" + 1)
      .expect(200);
    done();
  });
});
