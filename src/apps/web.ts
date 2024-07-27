import express, { Request } from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import publicRouter from "../routes/public-api";
import privateRouter from "../routes/private-api";
import sellerRouter from "../routes/seller-api";
import cors from "cors";
import session from "express-session";
import path from "path";
import uploadApi from "../routes/upload-api";

export const web = express();
web.use("/static", express.static("./static"));

web.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
web.use(
  session({
    secret: "iniadalahtoken1", // Ganti dengan secret yang kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true jika menggunakan HTTPS
  })
);
web.use(express.json());
web.use(publicRouter);
web.use(uploadApi);
web.use(privateRouter);
web.use(sellerRouter);

web.use(errorMiddleware);
