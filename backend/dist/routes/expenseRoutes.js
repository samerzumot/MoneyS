"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const router = (0, express_1.Router)();
router.get("/", expenseController_1.listExpenses);
router.post("/", expenseController_1.createExpenseHandler);
router.put("/:expenseId", expenseController_1.updateExpenseHandler);
router.delete("/:expenseId", expenseController_1.deleteExpenseHandler);
router.post("/:expenseId/paid", expenseController_1.markExpensePaidHandler);
exports.default = router;
//# sourceMappingURL=expenseRoutes.js.map