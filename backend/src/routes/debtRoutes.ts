import { Router } from "express";
import {
  createDebtHandler,
  deleteDebtHandler,
  listDebts,
  recordPaymentHandler,
  updateDebtHandler,
} from "../controllers/debtController";

const router = Router();

router.get("/", listDebts);
router.post("/", createDebtHandler);
router.put("/:debtId", updateDebtHandler);
router.delete("/:debtId", deleteDebtHandler);
router.post("/:debtId/payments", recordPaymentHandler);

export default router;
