import { NextFunction, Response } from "express";
import { StoreRequest } from "../models/store-model";
import { BalanceService } from "../services/balance-service";

export class BalanceController {
  static async add(req: StoreRequest, res: Response, next: NextFunction) {
    try {
      const response = await BalanceService.add(req.store!, req.body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
