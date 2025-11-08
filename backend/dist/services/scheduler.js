"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchedulers = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const notificationService_1 = require("./notificationService");
let initialized = false;
const registerSchedulers = () => {
    if (initialized) {
        return;
    }
    initialized = true;
    node_cron_1.default.schedule("15 * * * *", async () => {
        try {
            await (0, notificationService_1.dispatchPendingNotifications)();
        }
        catch (error) {
            console.error("Failed to dispatch notifications", error);
        }
    });
    node_cron_1.default.schedule("0 8 * * *", async () => {
        try {
            await (0, notificationService_1.queueExpenseReminders)();
            await (0, notificationService_1.queueDebtPaymentReminders)();
        }
        catch (error) {
            console.error("Failed to queue reminders", error);
        }
    });
};
exports.registerSchedulers = registerSchedulers;
//# sourceMappingURL=scheduler.js.map