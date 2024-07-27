import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../models/users-model";
import {
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductUpdateRequest,
  QueryParamsGetAll,
} from "../models/product-model";
import { ProductService } from "../services/product-service";
import { StoreRequest } from "../models/store-model";

export class ProductController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as ProductCreateRequest;
      const response = await ProductService.create(req.user!, body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as ProductUpdateRequest;
      const response = await ProductService.update(req.user!, body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        size: req.query.size ? Number(req.query.size) : 10,
        most_sold: req.query.most_sold ? req.query.most_sold : false,
        news: req.query.news ? Boolean(req.query.news) : true,
      } as QueryParamsGetAll;
      const response = await ProductService.getAll(query);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const product = req.body as ProductDeleteRequest;
      const response = await ProductService.delete(req.user!, product);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params.productId;
      console.log("HIT");
      const response = await ProductService.getById(params);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params.storeId;
      const response = await ProductService.getByStore(params);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadImage(
    req: StoreRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ProductService.uploadImage(req);

      res.status(200).json({
        data: {
          file_name: response,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
