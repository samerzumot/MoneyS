"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchPendingNotifications = exports.queueDebtPaymentReminders = exports.queueExpenseReminders = exports.getNotificationsForUser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const prisma_1 = require("../utils/prisma");
let mailTransporter = null;
const getMailTransporter = () => {
    if (mailTransporter) {
        return mailTransporter;
    }
    if (!env_1.ENV.email.host || !env_1.ENV.email.port || !env_1.ENV.email.user || !env_1.ENV.email.pass) {
        console.warn("SMTP credentials missing. Email notifications disabled.");
        return null;
    }
    mailTransporter = nodemailer_1.default.createTransport({
        host: env_1.ENV.email.host,
        port: env_1.ENV.email.port,
        secure: env_1.ENV.email.port === 465,
        auth: {
            user: env_1.ENV.email.user,
            pass: env_1.ENV.email.pass,
        },
    });
    return mailTransporter;
};
const getNotificationsForUser = async (userId) => {
    const notifications = await prisma_1.prisma.notification.findMany({
        where: { userId },
        orderBy: { sendAt: "asc" },
    });
    return notifications.map((notification) => ({
        ...notification,
    }));
};
exports.getNotificationsForUser = getNotificationsForUser;
const queueExpenseReminders = async () => {
    const now = new Date();
    const upcomingWindow = new Date();
    upcomingWindow.setDate(upcomingWindow.getDate() + 10);
    const expenses = await prisma_1.prisma.recurringExpense.findMany({
        where: {
            dueDate: {
                gte: now,
                lte: upcomingWindow,
            },
        },
        include: {
            user: true,
        },
    });
    for (const expense of expenses) {
        const reminderDate = new Date(expense.dueDate);
        reminderDate.setDate(reminderDate.getDate() - expense.reminderDays);
        const existing = await prisma_1.prisma.notification.findFirst({
            where: {
                expenseId: expense.id,
                type: "EXPENSE_REMINDER",
                status: "PENDING",
            },
        });
        if (existing) {
            continue;
        }
        await prisma_1.prisma.notification.create({
            data: {
                userId: expense.userId,
                expenseId: expense.id,
                type: "EXPENSE_REMINDER",
                status: "PENDING",
                sendAt: reminderDate > now ? reminderDate : now,
                channel: env_1.ENV.email.host ? "email" : "in-app",
                message: `Upcoming ${expense.name} bill of $${expense.amount
                    .toNumber()
                    .toFixed(2)} is due on ${expense.dueDate.toDateString()}`,
            },
        });
    }
};
exports.queueExpenseReminders = queueExpenseReminders;
const queueDebtPaymentReminders = async () => {
    const now = new Date();
    const upcomingWindow = new Date();
    upcomingWindow.setDate(upcomingWindow.getDate() + 14);
    const debts = await prisma_1.prisma.debtAccount.findMany({
        where: {
            dueDate: {
                not: null,
                gte: now,
                lte: upcomingWindow,
            },
        },
        include: {
            user: true,
        },
    });
    for (const debt of debts) {
        if (!debt.dueDate) {
            continue;
        }
        const reminderDate = new Date(debt.dueDate);
        reminderDate.setDate(reminderDate.getDate() - 5);
        const existing = await prisma_1.prisma.notification.findFirst({
            where: {
                debtId: debt.id,
                type: "DEBT_PAYMENT",
                status: "PENDING",
            },
        });
        if (existing) {
            continue;
        }
        await prisma_1.prisma.notification.create({
            data: {
                userId: debt.userId,
                debtId: debt.id,
                type: "DEBT_PAYMENT",
                status: "PENDING",
                sendAt: reminderDate > now ? reminderDate : now,
                channel: env_1.ENV.email.host ? "email" : "in-app",
                message: `Pay at least $${debt.minPayment
                    .toNumber()
                    .toFixed(2)} toward ${debt.name} by ${debt.dueDate.toDateString()}.`,
            },
        });
    }
};
exports.queueDebtPaymentReminders = queueDebtPaymentReminders;
const dispatchPendingNotifications = async () => {
    const transporter = getMailTransporter();
    const now = new Date();
    const pending = await prisma_1.prisma.notification.findMany({
        where: {
            status: "PENDING",
            sendAt: {
                lte: now,
            },
        },
        include: {
            user: true,
            expense: true,
            debt: true,
        },
    });
    for (const notification of pending) {
        try {
            if (transporter && notification.user?.email) {
                await transporter.sendMail({
                    from: env_1.ENV.email.from ?? env_1.ENV.email.user,
                    to: notification.user.email,
                    subject: notification.type === "EXPENSE_REMINDER"
                        ? "Upcoming recurring expense reminder"
                        : notification.type === "DEBT_PAYMENT"
                            ? "Debt payment reminder"
                            : "Debt optimizer alert",
                    text: notification.message,
                });
                await prisma_1.prisma.notification.update({
                    where: { id: notification.id },
                    data: {
                        status: "SENT",
                        sentAt: new Date(),
                    },
                });
            }
            else {
                await prisma_1.prisma.notification.update({
                    where: { id: notification.id },
                    data: {
                        status: transporter ? "SENT" : "SKIPPED",
                        sentAt: new Date(),
                    },
                });
            }
        }
        catch (error) {
            console.error("Error dispatching notification", notification.id, error);
        }
    }
};
exports.dispatchPendingNotifications = dispatchPendingNotifications;
//# sourceMappingURL=notificationService.js.map