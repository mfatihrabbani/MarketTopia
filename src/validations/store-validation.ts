import {ZodType, z } from "zod"

export class StoreValidation {
    static CREATE: ZodType = z.object({
        store_name: z.string().min(1),
        name: z.string().min(1)
    })
    static UPDATE: ZodType = z.object({
        store_name: z.string().min(1),
        name: z.string().min(1)
    })
}