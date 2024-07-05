import { User } from "@prisma/client";
import prisma from "../apps/database";
import { StoreCreateRequest, StoreCreateResponse } from "../models/store-model";
import { StoreValidation } from "../validations/store-validation";
import { Validation } from "./validation";
import { ResponseError } from "../errors/response-error";
import {v4 as uuid} from "uuid";

export class StoreService {
    static async create(user: User, store: StoreCreateRequest):Promise<StoreCreateResponse> {
        store = Validation.validate(StoreValidation.CREATE, store)

        console.log("Users", user)


        const isStoreExist = await prisma.store.findFirst({
            where: {
                user_id: user.user_id
            }
        })

        if(isStoreExist) {
            throw new ResponseError(404, "Store already exist")
        }

        const privateKey = uuid()

        store = await prisma.store.create({
            data : {
                store_id : uuid(),
                user_id : user.user_id,
                name: store.name, 
                store_name: store.store_name,
                private_key : privateKey,
                is_active: true
            }
        })

        return {
            store_name : store.store_name,
            name: store.name
        }
    }
}