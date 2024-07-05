import {ZodType, z } from "zod"

export class ProductValidation {
    static CREATE: ZodType = z.object({
        product_name: z.string().min(1),
        product_description: z.string().min(1),
        category_id: z.string().min(1),
        payment_method: z.string().min(1),
        price: z.number()
    })
}