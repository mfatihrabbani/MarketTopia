import prisma from "../../src/apps/database";

export class BalanceUtil {
  static async delete() {
    await prisma.balanceUser.deleteMany({
      where: {
        user_id: "test",
      },
    });
  }
}
