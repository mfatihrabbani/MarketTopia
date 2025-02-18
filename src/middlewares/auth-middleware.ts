import { NextFunction, Response } from "express";
import prisma from "../apps/database";
import { UserRequest } from "../models/users-model";
import { StoreRequest } from "../models/store-model";
import { Store, User } from "@prisma/client";

export class AuthMiddleware {
  static async user(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");

    console.log(token);

    if (token) {
      const user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });
      console.log(user);
      if (user) {
        req.user = user as User;
        next();
        return;
      }
    }

    res.status(404).json({
      message: "Unauthorized",
    });
  }

  static async store(req: StoreRequest, res: Response, next: NextFunction) {
    const token = req.get("Authorization");
    const tokenStore = req.get("PrivateKey-Store");

    console.log(tokenStore);

    let store;
    let user;
    if (!token) {
      if (!tokenStore) {
        return res.status(404).json({
          message: "Unauthorized",
        });
      }
      console.log("Find store by token store");
      store = await prisma.store.findFirst({
        where: {
          private_key: tokenStore,
        },
      });

      if (!store) {
        console.log("Store gaada");
        return res.status(404).json({
          message: "Unauthorized",
        });
      }
    } else {
      user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });
      const existStore = await prisma.store.findFirst({
        where: {
          user_id: user?.user_id,
        },
      });
      store = existStore;
      if (!existStore) {
        return res.status(404).json({
          message: "Please make a store first",
        });
      }
    }
    req.user = user as User;
    req.store = store as Store;
    console.log("STORE", store);
    console.log("Store ada");
    next();
    return;
  }
}
