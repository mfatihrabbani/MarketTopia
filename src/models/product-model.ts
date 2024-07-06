export type ProductCreateRequest = {
    product_name: string;
    product_description: string;
    category_id: string;
    payment_method: string;
    price: number;
}

export type ProductCreateResponse = {
    product_id: string;
    product_name: string;
    product_description: string;
    category_id: string;
    payment_method: string;
    price: number;
    total_sold: number;
    is_active: boolean;
}

export type ProductUpdateRequest = {
    product_id : string;
    product_name : string
    product_description : string;
    category_id : string;
    payment_method : string;
    price : number;
}

export interface ProductUpdateResponse extends ProductCreateResponse{
    image_url: string;
}

export type ObjectValidateProductReq = {
    category_id: string;
    payment_method:string;
}