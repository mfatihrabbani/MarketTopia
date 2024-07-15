import { User } from "@prisma/client";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateOrderRequest,
  GetOrderResponse,
  CreateOrderResponse,
  CheckoutRequest,
  CheckoutResponse,
  GetOrderByIdRequest,
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

  static async checkout(
    users: User,
    order: CheckoutRequest
  ): Promise<CheckoutResponse> {
    order = Validation.validate(OrderValidation.CHECKOUT, order);

    const existOrder = await prisma.order.findFirst({
      where: {
        order_id: order.order_id,
      },
    });

    if (!existOrder) {
      throw new ResponseError(404, "Order not found");
    }

    const product = await prisma.product.findFirst({
      where: {
        product_id: existOrder.product_id,
      },
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    const amountProduct = await prisma.orderItem.findFirst({
      where: {
        AND: [
          {
            product_id: existOrder.product_id,
          },
          {
            order_id: existOrder.order_id,
          },
        ],
      },
    });

    if (!amountProduct) {
      throw new ResponseError(404, "Order item not found");
    }

    const userBalance = await prisma.balanceUser.findFirst({
      where: {
        AND: [
          {
            user_id: users.user_id,
          },
          {
            store_id: product.store_id,
          },
        ],
      },
    });

    if ((userBalance?.balance || 0) < amountProduct.amount * product.price) {
      console.log(amountProduct.amount * product.price);
      throw new ResponseError(400, "Your balance not enough");
    }

    await prisma.$transaction(async () => {
      const tempoStockUser = await prisma.stockProduct.findMany({
        where: {
          AND: [
            {
              product_id: product.product_id,
            },
            {
              is_sold: false,
            },
          ],
        },
        take: amountProduct.amount,
      });

      if (tempoStockUser.length < amountProduct.amount) {
        throw new ResponseError(400, "Out of stock");
      }
      const user = await prisma.balanceUser.update({
        data: {
          balance: {
            decrement: amountProduct.amount * product.price,
          },
        },
        where: {
          balance_user_id: userBalance?.balance_user_id,
        },
      });

      const stockUser = await Promise.all(
        tempoStockUser.map(async (stock) => {
          const updateStock = await prisma.userItem.create({
            data: {
              user_item_id: uuid(),
              user_id: user.user_id,
              stock_id: stock.stock_id,
              order_id: order.order_id,
            },
          });
          const soldStock = await prisma.stockProduct.update({
            data: {
              is_sold: true,
            },
            where: {
              stock_id: stock.stock_id,
            },
          });
        })
      );

      await prisma.order.update({
        data: {
          status: 2,
        },
        where: {
          order_id: order.order_id,
        },
      });

      await prisma.product.update({
        data: {
          total_sold: {
            increment: amountProduct.amount,
          },
        },
        where: {
          product_id: product.product_id,
        },
      });
    });

    const currentBalance = await prisma.balanceUser.findFirst({
      where: {
        AND: [
          {
            user_id: users.user_id,
          },
          {
            store_id: product.store_id,
          },
        ],
      },
    });

    return {
      status_checkout: "SUCCESS",
      status_payment: "SUCCESS",
      balance_left: currentBalance?.balance || 0,
    };
  }

  static async getById(
    user: User,
    order: GetOrderByIdRequest
  ): Promise<GetOrderResponse> {
    order = Validation.validate(OrderValidation.GETBYID, order);

    const dataOrder = await prisma.order.findFirst({
      where: { order_id: order.order_id },
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
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!dataOrder) {
      throw new ResponseError(404, "Order not found");
    }

    if (dataOrder.user_id !== user.user_id) {
      throw new ResponseError(404, "You cannot see another user order");
    }

    const amountProduct = await prisma.orderItem.findFirst({
      where: {
        order_id: order.order_id,
      },
    });

    return {
      username: dataOrder.user.username,
      order_id: dataOrder.order_id,
      store_id: dataOrder.store_id,
      store_name: dataOrder.store.store_name,
      product_id: dataOrder.product_id,
      amount: amountProduct?.amount || 0,
      total_price: dataOrder.price,
      status: dataOrder.status_type.type_status_name,
      product: {
        product_id: dataOrder.product.product_id,
        product_name: dataOrder.product.product_name,
        product_description: dataOrder.product.product_description,
        total_sold: dataOrder.product.total_sold,
        image_url: dataOrder.product.image_url,
        price: dataOrder.product.price,
      },
    };
  }
}
