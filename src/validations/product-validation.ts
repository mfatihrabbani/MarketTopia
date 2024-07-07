import { ZodType, z } from "zod";

export class ProductValidation {
  static CREATE: ZodType = z.object({
    product_name: z.string().min(1),
    product_description: z.string().min(1),
    category_id: z.string().min(1),
    payment_method: z.string().min(1),
    price: z.number().positive(),
  });

  static UPDATE: ZodType = z.object({
    product_id: z.string().min(1),
    product_name: z.string().min(1),
    product_description: z.string().min(1),
    category_id: z.string().min(1),
    payment_method: z.string().min(1),
    price: z.number().positive(),
  });

  static DELETE: ZodType = z.object({
    product_id: z.string().min(1),
  });

  static GETBYID: ZodType = z.string().min(1);

  static GETBYSTORE: ZodType = z.string().min(1);
}
