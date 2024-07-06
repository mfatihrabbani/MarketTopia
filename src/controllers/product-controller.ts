import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../models/users-model";
import { ProductCreateRequest, ProductUpdateRequest, QueryParamsGetAll } from "../models/product-model";
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

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const query = {
                size: req.query.size ? Number(req.query.size) : 10,
                most_sold: req.query.most_sold ? req.query.most_sold : false,
                news: req.query.news ? Boolean(req.query.news) : true
            } as QueryParamsGetAll
            const response = await ProductService.getAll(query)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}