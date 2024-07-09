export type AddUserBalanceInStoreRequest = {
  growid: string;
  amount: number;
  type: string;
};

export type UserBalanceInStoreResponse = {
  username: string;
  store_name: string;
  balance: number;
};
