import { User } from "@prisma/client";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateOrderRequest,
  GetOrderResponse,
  CreateOrderResponse,
} from "../models/order-model";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "./validation";
import { v4 as uuid } from "uuid";

export class OrderService {
  static async create(
    user: User,
    orders: CreateOrderRequest
  ): Promise<CreateOrderResponse> {
    orders = Validation.validate(OrderValidation.CREATE, orders);

    const product = await prisma.product.findFirst({
      where: {
        product_id: orders.product_id,
      },
    });

    if (!product) {
      throw new ResponseError(404, "Prodcut not found");
    }

    const totalStock = await prisma.stockProduct.count({
      where: {
        product_id: product.product_id,
        AND: [
          {
            is_sold: false,
          },
        ],
      },
    });

    if (orders.amount > totalStock) {
      throw new ResponseError(400, "Out of stock");
    }

    const order = await prisma.order.create({
      data: {
        order_id: uuid(),
        user_id: user.user_id,
        store_id: orders.store_id,
        product_id: orders.product_id,
        price: product.price * orders.amount,
        order_date: new Date().toISOString(),
        status: 1,
      },
    });

    const orderItem = await prisma.orderItem.create({
      data: {
        order_item_id: uuid(),
        order_id: order.order_id,
        amount: orders.amount,
        total_price: product.price * orders.amount,
        product_id: order.product_id,
      },
    });

    const statusOrder = await prisma.typeStatus.findFirst({
      where: {
        type_id: order.status,
      },
    });

    return {
      order_id: order.order_id,
      store_id: order.store_id,
      product_id: order.product_id,
      amount: orders.amount,
      total_price: order.price,
      status: statusOrder?.type_status_name,
    };
  }

  static async getByUser(user: User): Promise<GetOrderResponse[]> {
    const ordersUser = await prisma.order.findMany({
      where: { user_id: user.user_id },
      orderBy: {
        order_date: "desc",
      },
      include: {
        product: {
          select: {
            image_url: true,
            product_id: true,
            product_name: true,
            product_description: true,
            total_sold: true,
            price: true,
          },
        },
        store: {
          select: {
            store_name: true,
          },
        },
        status_type: {
          select: {
            type_status_name: true,
          },
        },
      },
    });

    return await Promise.all(
      ordersUser.map(async (order) => {
        const amount = await prisma.orderItem.findFirst({
          where: {
            order_id: order.order_id,
            AND: {
              product_id: order.product_id,
            },
          },
        });
        return {
          order_id: order.order_id,
          store_id: order.store_id,
          store_name: order.store.store_name,
          product_id: order.product_id,
          amount: amount?.amount || 0,
          total_price: order.price,
          status: order.status_type.type_status_name,
          product: {
            product_id: order.product.product_id,
            product_name: order.product.product_name,
            product_description: order.product.product_description,
            total_sold: order.product.total_sold,
            image_url: order.product.image_url,
            price: order.product.price,
          },
        };
      })
    );
  }
}
