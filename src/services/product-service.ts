import { User } from "@prisma/client";
import { ProductCreateRequest } from "../models/product-model";
import { Validation } from "./validation";
import { ProductValidation } from "../validations/product-validation";
import prisma from "../apps/database";
import { StoreService } from "./store-service";
import { ResponseError } from "../errors/response-error";
import {v4 as uuid} from "uuid";


export class ProductService {
    static async create(user: User, product: ProductCreateRequest) {
        product = Validation.validate(ProductValidation.CREATE, product)

        const storeId = await StoreService.getStoreIdByUserId(user.user_id)

        if(!storeId) {
            throw new ResponseError(404, "Store not found")
        }

        const totalProduct = await prisma.product.count({
            where : {
                store_id: user.user_id
            }
        })

        
        if(totalProduct > 5) {
            throw new ResponseError(400, "Limit create product")
        }

        const existCategory = await prisma.category.findFirst({
            where: {
                category_id: product.category_id
            }
        })

        if(!existCategory){
            throw new ResponseError(404, "Category not found")
        }

        const existPaymentMethod = await prisma.paymentMethod.findFirst({
            where : {
                payment_id: product.payment_method
            }
        })

        if(!existPaymentMethod){
            throw new ResponseError(404, "Payment method not found")
        }

        product = await prisma.product.create({
            data : {
                product_id: uuid(),
                store_id: storeId,
                product_name: product.product_name,
                product_description: product.product_description,
                category_id: product.category_id,
                payment_method: product.payment_method,
                price: product.price,
                total_sold: 0,
                is_active: true,
                image_url: `${process.env.PATH_PUBLIC_FILE}/default.png`
            }
        })

        return {
            product_id: uuid(),
            product_name: product.product_name,
            product_description: product.product_description,
            category_id: existCategory.category_name,
            payment_method: existPaymentMethod?.payment_name,
            price: product.price,
            total_sold: 0,
            is_active: true,
        }
    }
}