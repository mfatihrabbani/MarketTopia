import { NextFunction, Response } from "express";
import prisma from "../apps/database";
import { UserRequest } from "../models/users-model";
import { StoreRequest } from "../models/store-model";
import { Store, User } from "@prisma/client";

export class AuthMiddleware {
  static async user(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");

    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (user) {
      req.user = user as User;
      next();
      return;
    }

    res.status(404).json({
      message: "Unauthorized",
    });
  }

  static async store(req: StoreRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");

    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Unauthorized",
      });
    }
    const existStore = await prisma.store.findFirst({
      where: {
        user_id: user?.user_id,
      },
    });
    if (!existStore) {
      return res.status(404).json({
        message: "Please make a store first",
      });
    }
    req.user = user as User;
    req.store = existStore as Store;
    next();
    return;
  }
}
