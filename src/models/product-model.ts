import { boolean } from "zod";

export type ProductCreateRequest = {
  product_name: string;
  product_description: string;
  category_id: string;
  payment_method: string;
  price: number;
  image_url: string | null;
  display_image_url: string | null;
};

export type ProductCreateResponse = {
  product_id: string;
  product_name: string;
  product_description: string;
  category_id: string;
  payment_method: string;
  price: number;
  total_sold: number;
  is_active: boolean;
};

export type ProductUpdateRequest = {
  product_id: string;
  product_name: string;
  product_description: string;
  category_id: string;
  payment_method: string;
  price: number;
};

export interface ProductUpdateResponse extends ProductCreateResponse {
  image_url: string | null;
}

export type ObjectValidateProductReq = {
  category_id: string;
  payment_method: string;
};

export type QueryParamsGetAll = {
  size?: number;
  most_sold?: boolean;
  news?: boolean;
};

export type ProductGetResponse = {
  image_url: string | null;
  product_id: string;
  product_name: string;
  product_description: string;
  total_stock?: number;
  total_sold: number;
  price: number;
  store_id?: string;
  store_name?: string;
  category_id?: string;
  payment_method?: string;
  display_image_url?: string | null;
};

export type ProductDeleteRequest = {
  product_id: string;
};
export type ProductDeleteResponse = {
  message: string;
};

export type GetProductParams = string;

export type QuerySearchParams = {
  product_search?: string;
  page: string | number;
  size: string | number;
  news?: string | boolean;
  most_sold?: string | boolean;
};

export type QuerySearchResponse = {
  products: ProductGetResponse[];
  page: {
    page: number;
    size: number;
    total_page: number;
    total_item: number;
  };
};

export type ConditionSearchProduct = {
  product_name?: {
    contains: string;
  };
  AND: Array<{
    is_active: boolean;
  }>;
};
