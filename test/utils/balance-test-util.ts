import prisma from "../../src/apps/database";

export class BalanceUtil {
  static async delete() {
    await prisma.balanceUser.deleteMany({
      where: {
        user_id: "test",
      },
    });
  }

  static async create() {
    await prisma.balanceUser.create({
      data: {
        balance_user_id: "09090",
        user_id: "test",
        store_id: "123",
        balance: 10000,
      },
    });
  }
}
