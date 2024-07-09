import { ZodType, z } from "zod";

export class BalanceValidation {
  static ADD: ZodType = z.object({
    growid: z.string().min(1),
    amount: z.number(),
    type: z.string().min(1),
  });
}
