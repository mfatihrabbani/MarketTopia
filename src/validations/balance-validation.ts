import { ZodType, z } from "zod";

export class BalanceValidation {
  static ADD: ZodType = z.object({
    growid: z.string().min(1),
    amount: z.number(),
    type: z.string().min(1),
  });

  static GETBYID: ZodType = z.object({
    store_id: z.string().min(1),
    user_id: z.string().min(1),
  });
}
