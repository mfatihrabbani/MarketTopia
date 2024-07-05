import { User } from "@prisma/client";
import { Request } from "express";

export type UserLoginResponse = {
    token : string;
}

export interface UserRequest extends Request {
    user? : User
}