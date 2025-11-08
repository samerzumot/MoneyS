"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planController_1 = require("../controllers/planController");
const router = (0, express_1.Router)();
router.get("/latest", planController_1.getLatestPlanHandler);
router.post("/generate", planController_1.generatePlanHandler);
exports.default = router;
//# sourceMappingURL=planRoutes.js.map