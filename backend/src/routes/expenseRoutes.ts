import { Router } from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  listExpenses,
  markExpensePaidHandler,
  updateExpenseHandler,
} from "../controllers/expenseController";

const router = Router();

router.get("/", listExpenses);
router.post("/", createExpenseHandler);
router.put("/:expenseId", updateExpenseHandler);
router.delete("/:expenseId", deleteExpenseHandler);
router.post("/:expenseId/paid", markExpensePaidHandler);

export default router;
