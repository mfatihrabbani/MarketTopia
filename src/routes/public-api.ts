import express from "express"
import { UserController } from "../controllers/user-controller"

const publicRouter = express.Router()

publicRouter.get("/auth/login", UserController.loginDiscord)
publicRouter.get("/auth/callback", UserController.callbackDiscordLogin)

export default publicRouter