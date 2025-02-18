import { ZodType, z } from "zod";

export class OrderValidation {
  static CREATE: ZodType = z.object({
    store_id: z.string().min(1),
    product_id: z.string().min(1),
    amount: z.number().positive(),
  });
  static CHECKOUT: ZodType = z.object({
    order_id: z.string().min(1),
  });
  static GETBYID: ZodType = z.object({
    order_id: z.string().min(1),
  });
}
