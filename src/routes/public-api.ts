import express from "express"
import { UserController } from "../controllers/user-controller"
import { ProductController } from "../controllers/product-controller"

const publicRouter = express.Router()

publicRouter.get("/auth/login", UserController.loginDiscord)
publicRouter.get("/auth/callback", UserController.callbackDiscordLogin)

publicRouter.get("/products", ProductController.get)

export default publicRouter