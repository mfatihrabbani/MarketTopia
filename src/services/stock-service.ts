import { AddStock, AddStockResponse } from "../models/stock-model";
import { StockValidation } from "../validations/stock-validation";
import { Validation } from "./validation";
import prisma from "../apps/database";
import { v4 as uuid } from "uuid";
import { Store } from "@prisma/client";
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
}
