import nodemailer from "nodemailer";
import { ENV } from "../config/env";
import { prisma } from "../utils/prisma";

let mailTransporter: nodemailer.Transporter | null = null;

const getMailTransporter = () => {
  if (mailTransporter) {
    return mailTransporter;
  }

  if (!ENV.email.host || !ENV.email.port || !ENV.email.user || !ENV.email.pass) {
    console.warn("SMTP credentials missing. Email notifications disabled.");
    return null;
  }

  mailTransporter = nodemailer.createTransport({
    host: ENV.email.host,
    port: ENV.email.port,
    secure: ENV.email.port === 465,
    auth: {
      user: ENV.email.user,
      pass: ENV.email.pass,
    },
  });

  return mailTransporter;
};

export const getNotificationsForUser = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { sendAt: "asc" },
  });

  type NotificationRow = (typeof notifications)[number];

  return notifications.map((notification: NotificationRow) => ({
    ...notification,
  }));
};

export const queueExpenseReminders = async () => {
  const now = new Date();
  const upcomingWindow = new Date();
  upcomingWindow.setDate(upcomingWindow.getDate() + 10);

  const expenses = await prisma.recurringExpense.findMany({
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

    const existing = await prisma.notification.findFirst({
      where: {
        expenseId: expense.id,
        type: "EXPENSE_REMINDER",
        status: "PENDING",
      },
    });

    if (existing) {
      continue;
    }

    await prisma.notification.create({
      data: {
        userId: expense.userId,
        expenseId: expense.id,
        type: "EXPENSE_REMINDER",
        status: "PENDING",
        sendAt: reminderDate > now ? reminderDate : now,
        channel: ENV.email.host ? "email" : "in-app",
        message: `Upcoming ${expense.name} bill of $${expense.amount
          .toNumber()
          .toFixed(2)} is due on ${expense.dueDate.toDateString()}`,
      },
    });
  }
};

export const queueDebtPaymentReminders = async () => {
  const now = new Date();
  const upcomingWindow = new Date();
  upcomingWindow.setDate(upcomingWindow.getDate() + 14);

  const debts = await prisma.debtAccount.findMany({
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

    const existing = await prisma.notification.findFirst({
      where: {
        debtId: debt.id,
        type: "DEBT_PAYMENT",
        status: "PENDING",
      },
    });

    if (existing) {
      continue;
    }

    await prisma.notification.create({
      data: {
        userId: debt.userId,
        debtId: debt.id,
        type: "DEBT_PAYMENT",
        status: "PENDING",
        sendAt: reminderDate > now ? reminderDate : now,
        channel: ENV.email.host ? "email" : "in-app",
        message: `Pay at least $${debt.minPayment
          .toNumber()
          .toFixed(2)} toward ${debt.name} by ${debt.dueDate.toDateString()}.`,
      },
    });
  }
};

export const dispatchPendingNotifications = async () => {
  const transporter = getMailTransporter();
  const now = new Date();

  const pending = await prisma.notification.findMany({
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
          from: ENV.email.from ?? ENV.email.user,
          to: notification.user.email,
          subject:
            notification.type === "EXPENSE_REMINDER"
              ? "Upcoming recurring expense reminder"
              : notification.type === "DEBT_PAYMENT"
                ? "Debt payment reminder"
                : "Debt optimizer alert",
          text: notification.message,
        });

        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: "SENT",
            sentAt: new Date(),
          },
        });
      } else {
        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: transporter ? "SENT" : "SKIPPED",
            sentAt: new Date(),
          },
        });
      }
    } catch (error) {
      console.error("Error dispatching notification", notification.id, error);
    }
  }
};
