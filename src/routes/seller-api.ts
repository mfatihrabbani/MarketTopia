import express from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { ProductController } from "../controllers/product-controller";
import { StoreController } from "../controllers/store-controller";

const sellerRouter = express.Router();
sellerRouter.use(AuthMiddleware.store);

sellerRouter.patch("/stores", StoreController.update);

sellerRouter.post("/products", ProductController.create);
sellerRouter.patch("/products", ProductController.update);
sellerRouter.delete("/products", ProductController.delete);

sellerRouter.patch("/deposits", StoreController.updateDeposit);

export default sellerRouter;
