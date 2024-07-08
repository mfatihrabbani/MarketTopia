import { ProductGetResponse } from "./product-model";

export type CreateOrderRequest = {
  store_id: string;
  product_id: string;
  amount: number;
};

export type CreateOrderResponse = {
  order_id: string;
  store_id: string;
  product_id: string;
  amount: number;
  total_price: number;
  status?: string;
};

export type GetOrderResponse = {
  order_id: string;
  store_id: string;
  store_name: string;
  product_id: string;
  amount: number;
  total_price: number;
  status?: string;
  product?: ProductGetResponse;
};
