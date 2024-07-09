import supertest from "supertest";
import { ProductUtil } from "./utils/product-test-util";
import { StockUtil } from "./utils/stock-test-util";
import { StoreUtil } from "./utils/store-test-util";
import { UserUtil } from "./utils/user-test-utils";
import { web } from "../src/apps/web";

describe("POST /stocks", () => {
  beforeEach(async () => {
    await UserUtil.create();
    await StoreUtil.create();
    await ProductUtil.create();
  });

  afterEach(async () => {
    await StockUtil.deleteAll();
    await ProductUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });
  it("should create stock", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test",
        type_id: 1,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
  it("should failed create stock", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test1",
        type_id: 1,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(404);
  });
  it("should failed create stock", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test",
        type_id: 100,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(404);
  });
});
