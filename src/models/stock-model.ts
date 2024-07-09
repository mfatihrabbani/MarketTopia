export type AddStock = {
  product_id: string;
  type_id: number;
  data: string;
};

export interface AddStockResponse extends AddStock {
  stock_id: string;
}

export type GetStockUserResponse = {
  stock_id: string;
  data: string;
};
