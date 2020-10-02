import * as request from "supertest";
import { app } from "../index";
const customer1 = require("./fixtures/customers");

/**
 * Testing get all customers endpoint
 */

describe("GET /customers", function () {
  it("respond with json structure containing all shop customers", async function (done) {
    await request(app)
      .get("/customers")
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
