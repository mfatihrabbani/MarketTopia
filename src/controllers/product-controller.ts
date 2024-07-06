import { NextFunction, Response } from "express";
import { UserRequest } from "../models/users-model";
import { ProductCreateRequest, ProductUpdateRequest } from "../models/product-model";
import { ProductService } from "../services/product-service";

export class ProductController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const body = req.body as ProductCreateRequest
            const response = await ProductService.create(req.user!, body)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const body = req.body as ProductUpdateRequest
            const response = await ProductService.update(req.user!, body)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}