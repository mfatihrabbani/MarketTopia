import { CreateOrderRequest } from "../models/order-model";
import { UserRequest } from "../models/users-model";
import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order-service";

export class OrderController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateOrderRequest;
      const response = await OrderService.create(req.user!, body);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.getByUser(req.user!);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async checkout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.checkout(req.user!, req.body);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
