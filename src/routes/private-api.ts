import express from "express"
import { AuthMiddleware } from "../middlewares/auth-middleware"
import { StoreController } from "../controllers/store-controller"
import { OrderController } from "../controllers/order-controller"

const privateRouter = express.Router()
privateRouter.use(AuthMiddleware.user)

privateRouter.post("/stores", StoreController.create)

privateRouter.post("/orders", OrderController.create)

export default privateRouter