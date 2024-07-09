import { ZodType, z } from "zod";

export class StockValidation {
  static ADD: ZodType = z.object({
    product_id: z.string().min(1),
    type_id: z.number(),
    data: z.string().min(1),
  });
}
