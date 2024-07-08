import { ZodType, z } from "zod";

export class UserValidation {
  static UPDATEDEPOSITGROWID: ZodType = z.object({
    growid: z
      .string()
      .min(1)
      .refine((s) => !s.includes(" "), "Dont use space"),
  });
}
