import { User } from "@prisma/client";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import { CreateOrderRequest, CreateOrderResponse } from "../models/order-model";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "./validation";
import {v4 as uuid} from "uuid";

export class OrderService {
    static async create(user: User, orders: CreateOrderRequest):Promise<CreateOrderResponse> {
        orders = Validation.validate(OrderValidation.CREATE, orders)

        const product = await prisma.product.findFirst({
            where: {
                product_id: orders.product_id
            }
        })

        if(!product) {
            throw new ResponseError(404, "Prodcut not found")
        }

        const totalStock = await prisma.stockProduct.count({
            where: {
                product_id : product.product_id,
                AND : [
                    {
                        is_sold : false
                    }
                ]
            }
        })

        if(totalStock < orders.amount){
            throw new ResponseError(400, "Out of stock")
        }

        const order = await prisma.order.create({
            data : {
                order_id : uuid(),
                user_id: user.user_id,
                store_id: orders.store_id,
                product_id: orders.product_id,
                price: product.price * orders.amount,
                order_date: Date(),
                status: 1
            }
        })

        const statusOrder = await prisma.typeStatus.findFirst({
            where: {
                type_id : order.status
            }
        })

        return {
            order_id: order.order_id,
            store_id: order.store_id,
            product_id: order.product_id,
            amount: orders.amount,
            total_price: order.price,
            status: statusOrder?.type_status_name
        }
    }
}