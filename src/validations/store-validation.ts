import { ZodType, z } from "zod";

export class StoreValidation {
  static CREATE: ZodType = z.object({
    store_name: z.string().min(1),
    name: z.string().min(1),
  });
  static UPDATE: ZodType = z.object({
    store_name: z.string().min(1),
    name: z.string().min(1),
  });
  static UPDATEDEPOWORLD: ZodType = z.object({
    world_deposit: z
      .string()
      .min(1)
      .refine((s) => !s.includes(" "), "Dont use space"),
    bot_deposit: z
      .string()
      .min(1)
      .refine((s) => !s.includes(" "), "Dont use space"),
  });
}
