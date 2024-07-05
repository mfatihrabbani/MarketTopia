import { NextFunction, Response } from "express";
import prisma from "../apps/database";
import { UserRequest } from "../models/users-model";
import { User } from "@prisma/client";

export class AuthMiddleware {
    static async user(req: UserRequest, res: Response, next: NextFunction) {
        const token = req.get("token")

        const user = await prisma.user.findFirst({
            where : {
                token: token
            }
        })

        if(user){
            req.user = user as User
            next()
        }

        res.status(404).json({
            message : "Unauthorized"
        })
    }
}