import { Router } from "express";
import dashboardRouter from "./dashboardRoutes";
import debtRouter from "./debtRoutes";
import expenseRouter from "./expenseRoutes";
import notificationRouter from "./notificationRoutes";
import planRouter from "./planRoutes";
import plaidRouter from "./plaidRoutes";
import userRouter from "./userRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/dashboard", dashboardRouter);
router.use("/debts", debtRouter);
router.use("/expenses", expenseRouter);
router.use("/notifications", notificationRouter);
router.use("/plan", planRouter);
router.use("/plaid", plaidRouter);

export default router;
