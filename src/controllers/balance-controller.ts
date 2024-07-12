import { NextFunction, Response } from "express";
import { StoreRequest } from "../models/store-model";
import { BalanceService } from "../services/balance-service";
import { GetUserBalanceParamsRequest } from "../models/balance-model";
import { UserRequest } from "../models/users-model";

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

  static async getById(req: StoreRequest, res: Response, next: NextFunction) {
    try {
      console.log(req.params);
      const params = {
        store_id: req.params.storeId,
        user_id: req.params.userId,
      } as GetUserBalanceParamsRequest;
      const response = await BalanceService.getById(req.store!, params);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async getInfoUserAndBalance(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.params);
      const params = {
        store_id: req.params.storeId,
      } as GetUserBalanceParamsRequest;
      const response = await BalanceService.getInfoUserAndBalance(
        req.user!,
        params
      );
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
