import express from "express"
import { errorMiddleware } from "../middlewares/error-middleware"
import publicRouter from "../routes/public-api"
import privateRouter from "../routes/private-api"
import sellerRouter from "../routes/seller-api"

export const web = express()
web.use(express.json())
web.use(publicRouter)
web.use(privateRouter)
web.use(sellerRouter)

web.use(errorMiddleware)