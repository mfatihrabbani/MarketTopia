export type AddUserBalanceInStoreRequest = {
  growid: string;
  amount: number;
  type: string;
};

export type UserBalanceInStoreResponse = {
  user_id: string;
  store_name?: string;
  balance: number;
  username: string;
};

export type GetUserBalanceParamsRequest = {
  store_id: string;
  user_id: string;
};

export type GetInforUserAndBalanceParamsRequest = {
  store_id: string;
};

export interface GetInfoUserAndBalanceResponse
  extends UserBalanceInStoreResponse {
  username: string;
  growid: string;
}
