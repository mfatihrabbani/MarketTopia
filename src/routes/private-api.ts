import express from "express"
import { AuthMiddleware } from "../middlewares/auth-middleware"
import { StoreController } from "../controllers/store-controller"
import { ProductController } from "../controllers/product-controller"

const privateRouter = express.Router()
privateRouter.use(AuthMiddleware.user)

privateRouter.post("/stores", StoreController.create)

export default privateRouter