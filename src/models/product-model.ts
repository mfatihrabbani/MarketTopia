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
    total_sold: string;
    is_active: boolean;
}