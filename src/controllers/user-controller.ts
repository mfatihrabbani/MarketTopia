import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { UserRequest } from "../models/users-model";

export class UserController {
  static loginDiscord(req: Request, res: Response, next: NextFunction) {
    try {
      const params = UserService.loginDiscord();
      res.redirect(`https://discord.com/api/oauth2/authorize?${params}`);
    } catch (error) {
      next(error);
    }
  }

  static async callbackDiscordLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const code = req.query.code as string;
      const token = await UserService.callbackDiscordLogin(code);
      res.status(200).json({
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateDepositGrowid(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await UserService.updateDepositGrowid(
        req.user!,
        req.body
      );
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
