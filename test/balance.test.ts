import supertest from "supertest";
import { web } from "../src/apps/web";
import { UserUtil } from "./utils/user-test-utils";
import { StoreUtil } from "./utils/store-test-util";
import { BalanceUtil } from "./utils/balance-test-util";

describe("POST /balances", () => {
  beforeEach(async () => {
    await UserUtil.create();
    await StoreUtil.create();
  });
  afterEach(async () => {
    await BalanceUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });

  it("should add balance", async () => {
    const response = await supertest(web)
      .post("/balances")
      .set("PrivateKey-Store", "123")
      .send({
        growid: "test_growid",
        amount: 100,
        type: "World Lock",
      });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test_id");
    expect(response.body.data.store_name).toBe("test_store");
    expect(response.body.data.balance).toBe(100);
  });

  it("should failed add balance token not found", async () => {
    const response = await supertest(web).post("/balances").send({
      growid: "test_growid",
      amount: 100,
      type: "World Lock",
    });

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
