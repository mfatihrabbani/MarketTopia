import { NextFunction, Response } from "express";
import { UserRequest } from "../models/users-model";
import { StoreCreateRequest, StoreCreateResponse } from "../models/store-model";
import { StoreService } from "../services/store-service";
import { User } from "@prisma/client";

export class StoreController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const body = req.body as StoreCreateRequest
            const response = await StoreService.create(req.user!, body)
            res.status(200).json({
                data : response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const body = req.body as StoreCreateRequest
            const response = await StoreService.update(req.user!, body)
            res.status(200).json({
                data : response
            })
        } catch (error) {
            next(error)
        }
    }
}