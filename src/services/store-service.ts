import { User } from "@prisma/client";
import prisma from "../apps/database";
import {
  StoreCreateRequest,
  StoreCreateResponse,
  StoreUpdateRequest,
  StoreUpdateResponse,
  UpdateDepositRequest,
  UpdateDepositResponse,
} from "../models/store-model";
import { StoreValidation } from "../validations/store-validation";
import { Validation } from "./validation";
import { ResponseError } from "../errors/response-error";
import { v4 as uuid } from "uuid";

export class StoreService {
  static async create(
    user: User,
    store: StoreCreateRequest
  ): Promise<StoreCreateResponse> {
    store = Validation.validate(StoreValidation.CREATE, store);

    console.log("Users", user);

    const isStoreExist = await prisma.store.findFirst({
      where: {
        user_id: user.user_id,
      },
    });

    if (isStoreExist) {
      throw new ResponseError(404, "Store already exist");
    }

    const privateKey = uuid();

    store = await prisma.store.create({
      data: {
        store_id: uuid(),
        user_id: user.user_id,
        name: store.name,
        store_name: store.store_name,
        private_key: privateKey,
        is_active: true,
      },
    });

    return {
      store_name: store.store_name,
      name: store.name,
    };
  }

  static async update(
    user: User,
    store: StoreUpdateRequest
  ): Promise<StoreUpdateResponse> {
    store = Validation.validate(StoreValidation.UPDATE, store);

    const isStoreExist = await prisma.store.findFirst({
      where: {
        user_id: user.user_id,
      },
    });

    if (!isStoreExist) {
      throw new ResponseError(404, "You don't have store");
    }

    store = await prisma.store.update({
      data: {
        user_id: user.user_id,
        name: store.name,
        store_name: store.store_name,
      },
      where: {
        user_id: user.user_id,
      },
    });

    return {
      store_name: store.store_name,
      name: store.name,
    };
  }

  static async getStoreIdByUserId(userId: string): Promise<string> {
    const storeId = await prisma.store.findFirst({
      where: {
        user_id: userId,
      },
    });
    return storeId!.store_id;
  }

  static async updateDeposit(
    user: User,
    deposit: UpdateDepositRequest
  ): Promise<UpdateDepositResponse> {
    deposit = Validation.validate(StoreValidation.UPDATEDEPOWORLD, deposit);
    const newWorldDeposit = await prisma.store.update({
      data: {
        world_deposit: deposit.world_deposit,
        bot_deposit: deposit.bot_deposit,
      },
      where: {
        user_id: user.user_id,
      },
      select: {
        world_deposit: true,
        bot_deposit: true,
        last_update_bot: true,
      },
    });
    return {
      world_deposit:
        newWorldDeposit.world_deposit?.toUpperCase() ?? "NO_HAVE_WORLD_DEPO",
      bot_deposit:
        newWorldDeposit.bot_deposit?.toUpperCase() ?? "NO_HAVE_BOT_DEPO",
      last_update_bot: newWorldDeposit?.last_update_bot ?? "UNKNOWN",
    };
  }
}
