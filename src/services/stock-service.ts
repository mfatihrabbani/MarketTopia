import {
  AddStock,
  AddStockResponse,
  GetStockUserResponse,
} from "../models/stock-model";
import { StockValidation } from "../validations/stock-validation";
import { Validation } from "./validation";
import prisma from "../apps/database";
import { v4 as uuid } from "uuid";
import { Store, User } from "@prisma/client";
import { ResponseError } from "../errors/response-error";

export class StockService {
  static async add(store: Store, stock: AddStock): Promise<AddStockResponse> {
    stock = Validation.validate(StockValidation.ADD, stock);

    const product = await prisma.product.findFirst({
      where: {
        product_id: stock.product_id,
        AND: [
          {
            store_id: store.store_id,
          },
        ],
      },
    });

    console.log("product", product);

    if (!product) {
      throw new ResponseError(404, "Cannot add stock to another store product");
    }

    const newStock = await prisma.stockProduct.create({
      data: {
        stock_id: uuid(),
        product_id: stock.product_id,
        data: stock.data,
        type_id: stock.type_id,
        is_sold: false,
      },
      select: {
        stock_id: true,
        product_id: true,
        data: true,
        type_id: true,
      },
    });

    return newStock;
  }

  static async addBulk(
    store: Store,
    stocks: AddStock[]
  ): Promise<AddStockResponse[]> {
    stocks = Validation.validate(StockValidation.ADDBULK, stocks);

    const newStock = await prisma.$transaction(async () => {
      const newStocks = await Promise.all(
        stocks.map(async (stock) => {
          const product = await prisma.product.findFirst({
            where: {
              product_id: stock.product_id,
              AND: [
                {
                  store_id: store.store_id,
                },
              ],
            },
          });

          if (!product) {
            throw new ResponseError(
              404,
              "Cannot add stock to another store product"
            );
          }

          return await prisma.stockProduct.create({
            data: {
              stock_id: uuid(),
              product_id: stock.product_id,
              data: stock.data,
              type_id: stock.type_id,
              is_sold: false,
            },
            select: {
              stock_id: true,
              product_id: true,
              data: true,
              type_id: true,
            },
          });
        })
      );
      return newStocks;
    });

    return newStock;
  }

  static async getStockUserByOrderId(
    user: User,
    order: string
  ): Promise<GetStockUserResponse[]> {
    const orderId = Validation.validate(StockValidation.GETBYORDER, order);

    const isOrderedByThisUser = await prisma.order.findFirst({
      where: {
        user_id: user.user_id,
        AND: {
          order_id: orderId,
        },
      },
    });

    if (!isOrderedByThisUser) {
      throw new ResponseError(404, "Order not found");
    }

    if (isOrderedByThisUser.status === 1) {
      throw new ResponseError(404, "Please checkout first this order");
    }

    const result = await prisma.userItem.findMany({
      where: {
        order_id: orderId,
        AND: [
          {
            user_id: user.user_id,
          },
        ],
      },
      include: {
        stock: true,
      },
    });

    return result.map((data) => {
      return {
        stock_id: data.stock_id,
        data: data.stock.data,
      };
    });
  }

  static async getStockByProduct(
    productId: string
  ): Promise<GetStockUserResponse[]> {
    productId = Validation.validate(StockValidation.GETBYPRODUCT, productId);

    const stocks = await prisma.stockProduct.findMany({
      where: {
        product_id: productId,
        AND: [
          {
            is_sold: false,
          },
        ],
      },
      select: {
        data: true,
        stock_id: true,
      },
    });

    return stocks;
  }
}
