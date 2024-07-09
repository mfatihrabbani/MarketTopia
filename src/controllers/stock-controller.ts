import { NextFunction, Response } from "express";
import { StoreRequest } from "../models/store-model";
import { StockService } from "../services/stock-service";
import { UserRequest } from "../models/users-model";

export class StockController {
  static async add(req: StoreRequest, res: Response, next: NextFunction) {
    try {
      const response = await StockService.add(req.store!, req.body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBulk(req: StoreRequest, res: Response, next: NextFunction) {
    try {
      console.log(req.body.data);
      const response = await StockService.addBulk(req.store!, req.body.data);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStockOrderUser(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await StockService.getStockUserByOrderId(
        req.user!,
        req.params.orderId
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
