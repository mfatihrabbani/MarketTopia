import { ZodType, z } from "zod";

export class UserValidation {
  static UPDATEDEPOSITGROWID: ZodType = z.object({
    growid: z
      .string()
      .min(1)
      .refine((s) => !s.includes(" "), "Dont use space"),
  });
  static SAVEUSER: ZodType = z.object({
    username: z.string().min(1),
    token: z.string().min(1),
    id: z.string().min(1),
    avatar: z.string().min(1),
  });
}
