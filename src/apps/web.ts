import express from "express"
import { errorMiddleware } from "../middlewares/error-middleware"
import publicRouter from "../routes/public-api"

export const web = express()
web.use(express.json())
web.use(publicRouter)

web.use(errorMiddleware)