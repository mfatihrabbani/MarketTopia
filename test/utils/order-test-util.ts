import prisma from "../../src/apps/database";

export class OrderUtil {
  static async delete() {
    await prisma.order.deleteMany({
      where: {
        product_id: "1234test",
      },
    });
  }
}
