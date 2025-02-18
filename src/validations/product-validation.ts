import { ZodType, z } from "zod";

export class ProductValidation {
  static CREATE: ZodType = z.object({
    product_name: z.string().min(1),
    product_description: z.string().min(1),
    category_id: z.string().min(1),
    payment_method: z.string().min(1),
    price: z.number().positive(),
    image_url: z.string().min(1),
    display_image_url: z.string().min(1),
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

  static QUERYPRODUCT: ZodType = z.object({
    product_search: z.string().optional(),
    page: z
      .string()
      .min(1)
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Page must be a number",
      }),
    size: z
      .string()
      .min(1)
      .transform((val) => Number(val)),
    most_sold: z
      .string()
      .optional()
      .transform((val) => Boolean(Number(val))),
    news: z
      .string()
      .optional()
      .transform((val) => Boolean(Number(val))),
  });
}
