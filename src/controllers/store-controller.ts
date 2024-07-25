import { NextFunction, Response } from "express";
import { UserRequest } from "../models/users-model";
import {
  StoreCreateRequest,
  StoreRequest,
  UpdateDepositRequest,
} from "../models/store-model";
import { StoreService } from "../services/store-service";

export class StoreController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as StoreCreateRequest;
      const response = await StoreService.create(req.user!, body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as StoreCreateRequest;
      const response = await StoreService.update(req.user!, body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await StoreService.getById(req.params.storeId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDeposit(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body as UpdateDepositRequest;
      const response = await StoreService.updateDeposit(req.user!, body);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPrivateKey(
    req: StoreRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const privateKey = req.store?.private_key;
      res.status(200).json({
        data: privateKey,
      });
    } catch (error) {
      next(error);
    }
  }
}
