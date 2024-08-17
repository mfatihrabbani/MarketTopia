import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { UserRequest, UserSessionRequest } from "../models/users-model";
import dotenv from "dotenv";
import logger from "../apps/winston";
dotenv.config();

export class UserController {
  static loginDiscord(req: any, res: Response, next: NextFunction) {
    try {
      const params = UserService.loginDiscord();
      req.session.oauthState = params.oauthState;
      res.redirect(`https://discord.com/api/oauth2/authorize?${params.url}`);
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
      const state = req.query.state as string;
      const token = await UserService.callbackDiscordLogin(code);
      const storeId = await UserService.getStoreByToken(token);
      req.session.user = token;
      req.session.store = storeId;
      res.cookie(
        "token",
        { user: token, storeId: storeId },
        { httpOnly: true, secure: true, sameSite: "none" }
      );
      res.redirect(process.env.BACK_URL! + "/?state=" + state);
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
      console.log("state:", req.query.state);
      if (req.session.oauthState !== req.query.state) {
        res.status(400).json({
          message: "Failed",
        });
        return;
      }

      logger.info("COOKIE", req.cookies.token.user);
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
      delete req.session;
    } catch (error) {
      next(error);
    }
  }

  static async saveUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("HIT");
      const response = await UserService.saveUser(req.body);
      console.log(response);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStoreId(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getStoreByToken(req.user?.token!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
