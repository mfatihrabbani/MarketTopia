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

export type UpdateDepositRequest = {
  world_deposit: string;
  bot_deposit: string;
};

export interface UpdateDepositResponse extends UpdateDepositRequest {
  last_update_bot: string | undefined;
}
