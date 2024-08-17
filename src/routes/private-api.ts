import express from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { StoreController } from "../controllers/store-controller";
import { OrderController } from "../controllers/order-controller";
import { UserController } from "../controllers/user-controller";
import { StockController } from "../controllers/stock-controller";
import { BalanceController } from "../controllers/balance-controller";

const privateRouter = express.Router();
privateRouter.use(AuthMiddleware.user);

privateRouter.post("/stores", StoreController.create);
privateRouter.get("/stores/:storeId", StoreController.getById);
privateRouter.get(
  "/balance/stores/:storeId",
  BalanceController.getInfoUserAndBalance
);

privateRouter.post("/orders", OrderController.create);
privateRouter.get("/orders", OrderController.getByUser);

privateRouter.patch("/users/deposits", UserController.updateDepositGrowid);
privateRouter.get("/users/stores", UserController.getStoreId);
privateRouter.post("/checkouts", OrderController.checkout);

privateRouter.get("/orders/:orderId", OrderController.getOrderById);
privateRouter.get("/orders/:orderId/items", StockController.getStockOrderUser);

export default privateRouter;
