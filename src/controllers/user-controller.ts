import { NextFunction, Request, Response } from "express";
import { UserLoginResponse } from "../models/users-model";
import { UserService } from "../services/user-service";

export class UserController {
    static loginDiscord(req: Request, res: Response, next: NextFunction) {
        try {
            const params = UserService.loginDiscord()
            res.redirect(`https://discord.com/api/oauth2/authorize?${params}`)
        }catch(error) {
            next(error)
        }
    } 

    static async callbackDiscordLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const code = req.query.code as string
            const token = await UserService.callbackDiscordLogin(code)
            res.status(200).json({
                data: {
                    token
                }
            })
        }catch(error) {
            next(error)
        }
    } 
}