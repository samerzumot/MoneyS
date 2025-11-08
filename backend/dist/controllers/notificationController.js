"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerNotificationSweepHandler = exports.listNotificationsHandler = void 0;
const notificationService_1 = require("../services/notificationService");
const listNotificationsHandler = async (req, res, next) => {
    try {
        const notifications = await (0, notificationService_1.getNotificationsForUser)(req.user.id);
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
};
exports.listNotificationsHandler = listNotificationsHandler;
const triggerNotificationSweepHandler = async (_req, res, next) => {
    try {
        await (0, notificationService_1.queueExpenseReminders)();
        await (0, notificationService_1.queueDebtPaymentReminders)();
        await (0, notificationService_1.dispatchPendingNotifications)();
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
exports.triggerNotificationSweepHandler = triggerNotificationSweepHandler;
//# sourceMappingURL=notificationController.js.map