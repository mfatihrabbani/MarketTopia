import prisma from "../../src/apps/database";

export class OrderUtil {
  static async delete() {
    await prisma.order.deleteMany({
      where: {
        product_id: "1234test",
      },
    });
  }

  static async create() {
    await prisma.order.create({
      data: {
        order_id: "test_order",
        user_id: "test",
        store_id: "123",
        product_id: "1234test",
        price: 100,
        order_date: new Date().toISOString(),
        status: 1,
      },
    });
  }

  static async createOrderItem() {
    await prisma.orderItem.create({
      data: {
        order_item_id: "test_order_item",
        order_id: "test_order",
        amount: 1000,
        total_price: 10000,
        product_id: "1234test",
      },
    });
  }

  static async deleteOrderItem() {
    await prisma.orderItem.deleteMany();
  }
}
