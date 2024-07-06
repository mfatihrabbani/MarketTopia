import { User } from "@prisma/client";
import { ObjectValidateProductReq, ProductCreateRequest, ProductUpdateRequest, ProductUpdateResponse } from "../models/product-model";
import { Validation } from "./validation";
import { ProductValidation } from "../validations/product-validation";
import prisma from "../apps/database";
import { StoreService } from "./store-service";
import { ResponseError } from "../errors/response-error";
import {v4 as uuid} from "uuid";


export class ProductService {
    static async basicValidate(user: User, product: ObjectValidateProductReq):Promise<string> {
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

        return storeId
    }


    static async create(user: User, product: ProductCreateRequest) {
        product = Validation.validate(ProductValidation.CREATE, product)

        const storeId = await this.basicValidate(user, {
            category_id: product.category_id,
            payment_method: product.payment_method,
        })

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
            category_id: product.category_id,
            payment_method: product.payment_method,
            price: product.price,
            total_sold: 0,
            is_active: true,
        }
    }

    static async update(user: User, product: ProductUpdateRequest):Promise<ProductUpdateResponse> {
        product = Validation.validate(ProductValidation.UPDATE, product)

        const existProduct = await prisma.product.findFirst({
            where : {
                product_id: product.product_id
            }
        })

        if(!existProduct){
            throw new ResponseError(404, "Product not found")
        }

        const storeId = await this.basicValidate(user, {
            category_id: product.category_id,
            payment_method: product.payment_method,
        })

        const newProduct = await prisma.product.update({
            data: {
                product_name: product.product_name,
                product_description: product.product_description,
                category_id: product.category_id,
                payment_method: product.payment_method,
                price: product.price,
            },
            where : {
                product_id : product.product_id
            }
        })

        return {
            product_id: uuid(),
            product_name: newProduct.product_name,
            product_description: newProduct.product_description,
            category_id: newProduct.category_id,
            payment_method: newProduct.payment_method,
            price: newProduct.price,
            total_sold: newProduct.total_sold,
            is_active: newProduct.is_active,
            image_url: newProduct.image_url,
        }
    }
}