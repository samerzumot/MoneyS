import cron from "node-cron";
import {
  dispatchPendingNotifications,
  queueDebtPaymentReminders,
  queueExpenseReminders,
} from "./notificationService";

let initialized = false;

export const registerSchedulers = () => {
  if (initialized) {
    return;
  }

  initialized = true;

  cron.schedule("15 * * * *", async () => {
    try {
      await dispatchPendingNotifications();
    } catch (error) {
      console.error("Failed to dispatch notifications", error);
    }
  });

  cron.schedule("0 8 * * *", async () => {
    try {
      await queueExpenseReminders();
      await queueDebtPaymentReminders();
    } catch (error) {
      console.error("Failed to queue reminders", error);
    }
  });
};
