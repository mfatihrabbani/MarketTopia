import { NextFunction, Response } from "express";
import { StoreRequest } from "../models/store-model";
import { TransactionService } from "../services/transaction-service";

export class TransactionController {
  static async getTransactionByStore(
    req: StoreRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await TransactionService.getTransactionByStore(
        req.store!
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
