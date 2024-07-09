import { Store } from "@prisma/client";
import prisma from "../apps/database";
import { ResponseError } from "../errors/response-error";
import {
  AddUserBalanceInStoreRequest,
  UserBalanceInStoreResponse,
} from "../models/balance-model";
import { BalanceValidation } from "../validations/balance-validation";
import { Validation } from "./validation";
import { randomUUID } from "crypto";

export class BalanceService {
  static async add(
    store: Store,
    data: AddUserBalanceInStoreRequest
  ): Promise<UserBalanceInStoreResponse> {
    data = Validation.validate(BalanceValidation.ADD, data);

    if (data.type.includes("Diamond Lock")) {
      data.amount = data.amount * 100;
    }

    const user = await prisma.user.findFirst({
      where: {
        growid: data.growid.toLowerCase(),
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }
    const existWallet = await prisma.balanceUser.findFirst({
      where: {
        store_id: store.store_id,
        AND: [
          {
            user_id: user.user_id,
          },
        ],
      },
    });

    let balance;

    if (!existWallet) {
      balance = await prisma.balanceUser.create({
        data: {
          balance_user_id: randomUUID(),
          balance: data.amount,
          user_id: user.user_id,
          store_id: store.store_id,
        },
      });
    } else {
      balance = await prisma.balanceUser.update({
        data: {
          balance: {
            increment: data.amount,
          },
        },
        where: {
          balance_user_id: existWallet.balance_user_id,
        },
      });
    }

    return {
      username: user.growid || "UNKNOWN",
      store_name: store.store_name,
      balance: balance.balance,
    };
  }
}
