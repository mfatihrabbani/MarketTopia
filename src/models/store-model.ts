import { Request } from "express";
import { Store, User } from "@prisma/client";

export type StoreCreateRequest = {
  store_name: string;
  name: string;
};

export type StoreCreateResponse = {
  store_name: string;
  name: string;
};

export type StoreUpdateRequest = {
  store_name: string;
  name: string;
};

export type StoreUpdateResponse = {
  store_name: string;
  name: string;
};

export type GetStoreByIdResponse = {
  store_name: string;
  name: string;
  world_deposit: string | null;
  bot_deposit: string | null;
  last_update_bot: string | null;
};

export type UpdateDepositRequest = {
  world_deposit: string;
  bot_deposit: string;
};

export interface UpdateDepositResponse extends UpdateDepositRequest {
  last_update_bot: string | undefined;
}

export interface StoreRequest extends Request {
  user?: User;
  store?: Store;
}
