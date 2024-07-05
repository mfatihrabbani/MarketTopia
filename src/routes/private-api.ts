import express from "express"
import { AuthMiddleware } from "../middlewares/auth-middleware"
import { StoreController } from "../controllers/store-controller"

const privateRouter = express.Router()
privateRouter.use(AuthMiddleware.user)

privateRouter.post("/stores", StoreController.create)
privateRouter.patch("/stores", StoreController.update)


export default privateRouter