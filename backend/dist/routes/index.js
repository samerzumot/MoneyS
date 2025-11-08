"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardRoutes_1 = __importDefault(require("./dashboardRoutes"));
const debtRoutes_1 = __importDefault(require("./debtRoutes"));
const expenseRoutes_1 = __importDefault(require("./expenseRoutes"));
const notificationRoutes_1 = __importDefault(require("./notificationRoutes"));
const planRoutes_1 = __importDefault(require("./planRoutes"));
const plaidRoutes_1 = __importDefault(require("./plaidRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
router.use("/user", userRoutes_1.default);
router.use("/dashboard", dashboardRoutes_1.default);
router.use("/debts", debtRoutes_1.default);
router.use("/expenses", expenseRoutes_1.default);
router.use("/notifications", notificationRoutes_1.default);
router.use("/plan", planRoutes_1.default);
router.use("/plaid", plaidRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map