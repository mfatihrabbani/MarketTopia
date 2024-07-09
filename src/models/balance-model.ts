export type AddUserBalanceInStoreRequest = {
  growid: string;
  amount: number;
  type: string;
};

export type UserBalanceInStoreResponse = {
  user_id: string;
  store_name: string;
  balance: number;
};

export type GetUserBalanceParamsRequest = {
  store_id: string;
  user_id: string;
};
