"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const debtController_1 = require("../controllers/debtController");
const router = (0, express_1.Router)();
router.get("/", debtController_1.listDebts);
router.post("/", debtController_1.createDebtHandler);
router.put("/:debtId", debtController_1.updateDebtHandler);
router.delete("/:debtId", debtController_1.deleteDebtHandler);
router.post("/:debtId/payments", debtController_1.recordPaymentHandler);
exports.default = router;
//# sourceMappingURL=debtRoutes.js.map