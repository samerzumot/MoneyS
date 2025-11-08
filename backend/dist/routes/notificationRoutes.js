"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
router.get("/", notificationController_1.listNotificationsHandler);
router.post("/dispatch", notificationController_1.triggerNotificationSweepHandler);
exports.default = router;
//# sourceMappingURL=notificationRoutes.js.map