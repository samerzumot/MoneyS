import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
import {
  dispatchPendingNotifications,
  getNotificationsForUser,
  queueDebtPaymentReminders,
  queueExpenseReminders,
} from "../services/notificationService";

export const listNotificationsHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notifications = await getNotificationsForUser(req.user!.id);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const triggerNotificationSweepHandler = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await queueExpenseReminders();
    await queueDebtPaymentReminders();
    await dispatchPendingNotifications();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
