import { ZodType, z } from "zod";

export class StockValidation {
  static ADD: ZodType = z.object({
    product_id: z.string().min(1),
    type_id: z.number(),
    data: z.string().min(1),
  });

  static ADDBULK: ZodType = z.array(
    z.object({
      product_id: z.string().min(1),
      type_id: z.number(),
      data: z.string().min(1),
    })
  );

  static GETBYORDER: ZodType = z.string().min(1);
  static GETBYPRODUCT: ZodType = z.string().min(1);
}
