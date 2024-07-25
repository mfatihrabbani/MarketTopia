import { Store } from "@prisma/client";
import {
  GetTransactionByStore,
  GetTransactionByStoreResponse,
} from "../models/transaction-model";
import prisma from "../apps/database";

export class TransactionService {
  static async getTransactionByStore(
    store: Store
  ): Promise<GetTransactionByStoreResponse[]> {
    const orderDoneByStore = await prisma.order.findMany({
      where: {
        store_id: store.store_id,
        AND: [
          {
            status: 2,
          },
        ],
      },
      orderBy: [{ order_date: "desc" }],
      include: {
        product: {
          select: {
            product_name: true,
          },
        },
        order_item: {
          select: {
            amount: true,
          },
        },
      },
    });

    return orderDoneByStore.map((order) => {
      return {
        product_name: order.product.product_name,
        amount: order.order_item[0].amount,
        time: order.order_date,
        total_price: order.price,
      };
    });
  }
}
