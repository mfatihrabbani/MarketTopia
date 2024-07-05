import { NextFunction } from "express";
import { UserRequest } from "../models/users-model";
import { ProductCreateRequest } from "../models/product-model";
import { ProductService } from "../services/product-service";

export class ProductController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const body = req.body as ProductCreateRequest
            const response = await ProductService.create(req.user!, body)
        } catch (error) {
            next(error)
        }
    }
}