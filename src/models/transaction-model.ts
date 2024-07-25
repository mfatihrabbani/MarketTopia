export type GetTransactionByStore = {
  store_id: string;
};

export type GetTransactionByStoreResponse = {
  amount: number;
  total_price: number;
  time: Date;
  product_name: string;
};
