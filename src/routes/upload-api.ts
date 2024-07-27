import express from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import multer from "multer";
import { upload } from "../apps/multer";
import { ProductController } from "../controllers/product-controller";

const uploadApi = express.Router();
uploadApi.use(AuthMiddleware.store);

uploadApi.post(
  "/uploads",
  upload.single("image"),
  ProductController.uploadImage
);

export default uploadApi;
