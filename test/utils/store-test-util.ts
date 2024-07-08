import prisma from "../../src/apps/database";

export class StoreUtil {
  static async deleteAll() {
    await prisma.store.deleteMany({
      where: {
        user_id: "test",
      },
    });
  }

  static async create() {
    await prisma.store.create({
      data: {
        store_id: "123",
        user_id: "test",
        name: "teststore",
        store_name: "test_store",
        private_key: "123",
        is_active: false,
        last_update_bot: new Date().toISOString(),
      },
    });
  }
}
