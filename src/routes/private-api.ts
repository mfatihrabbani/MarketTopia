import express from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { StoreController } from "../controllers/store-controller";
import { OrderController } from "../controllers/order-controller";
import { UserController } from "../controllers/user-controller";
import { StockController } from "../controllers/stock-controller";

const privateRouter = express.Router();
privateRouter.use(AuthMiddleware.user);

privateRouter.post("/stores", StoreController.create);

privateRouter.post("/orders", OrderController.create);
privateRouter.get("/orders", OrderController.getByUser);

privateRouter.patch("/users/deposits", UserController.updateDepositGrowid);

privateRouter.post("/checkouts", OrderController.checkout);

privateRouter.get("/orders/:orderId/items", StockController.getStockOrderUser);

export default privateRouter;
