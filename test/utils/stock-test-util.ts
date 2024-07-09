import prisma from "../../src/apps/database";

export class StockUtil {
  static async create() {
    await prisma.stockProduct.create({
      data: {
        stock_id: "test123",
        product_id: "1234test",
        data: "ID:TEST",
        is_sold: false,
        type_id: 1,
      },
    });
  }

  static async delete() {
    await prisma.stockProduct.delete({
      where: {
        stock_id: "test123",
      },
    });
  }

  static async deleteAll() {
    await prisma.stockProduct.deleteMany();
  }
}
