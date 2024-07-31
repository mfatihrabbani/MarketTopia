import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { UserRequest, UserSessionRequest } from "../models/users-model";
import dotenv from "dotenv";
dotenv.config();

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
    req: UserSessionRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const code = req.query.code as string;
      const token = await UserService.callbackDiscordLogin(code);
      const storeId = await UserService.getStoreByToken(token);
      req.session.user = token;
      req.session.store = storeId;
      res.cookie(
        "token",
        { user: token, storeId: storeId },
        { httpOnly: true, secure: true }
      );
      res.redirect(process.env.BACK_URL!);
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

  static async getSession(
    req: UserSessionRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("COOKIE", req.cookies.token.user);
      if (req.session.user) {
        res
          .status(200)
          .json({ user: req.session.user, storeId: req.session.store });
      } else if (req.cookies.token) {
        res.status(200).json({
          user: req.cookies.token.user,
          storeId: req.cookies.token.storeId,
        });
      } else {
        res.status(401).json({ message: "User not logged in" });
      }
    } catch (error) {
      next(error);
    }
  }
}
