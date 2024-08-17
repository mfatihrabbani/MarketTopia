import express from "express";
import { UserController } from "../controllers/user-controller";
import { ProductController } from "../controllers/product-controller";
import { BalanceController } from "../controllers/balance-controller";
import { StoreController } from "../controllers/store-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const publicRouter = express.Router();

publicRouter.get("/auth/login", UserController.loginDiscord);
publicRouter.get("/auth/callback", UserController.callbackDiscordLogin);
publicRouter.get("/auth/session", UserController.getSession);

publicRouter.post("/users/save", UserController.saveUser);

publicRouter.get("/search/products", ProductController.seacrhProduct);
publicRouter.get("/products/:productId", ProductController.getById);
publicRouter.get("/products", ProductController.get);
publicRouter.get("/stores/:storeId/products", ProductController.getByStore);

publicRouter.put(
  "/stores/bot-time",
  AuthMiddleware.store,
  StoreController.updateTime
);

publicRouter.post("/balances", AuthMiddleware.store, BalanceController.add);

export default publicRouter;
