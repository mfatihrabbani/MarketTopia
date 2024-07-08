import supertest from "supertest";
import { UserUtil } from "./utils/user-test-utils";
import { web } from "../src/apps/web";

describe("PATCH /users/deposits", () => {
  beforeEach(async () => {
    await UserUtil.create();
  });

  afterEach(async () => {
    await UserUtil.delete();
  });
  it("should update growid", async () => {
    const response = await supertest(web)
      .patch("/users/deposits")
      .set("Authorization", "token")
      .send({
        growid: "NEWGROWID",
      });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.growid).toBe("NEWGROWID");
  });

  it("should failed update growid have space growid", async () => {
    const response = await supertest(web)
      .patch("/users/deposits")
      .set("Authorization", "token")
      .send({
        growid: "NEWGROWI D",
      });

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
