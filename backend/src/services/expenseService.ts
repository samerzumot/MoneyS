import { Frequency } from "../generated/client/enums";
import { AppError } from "../utils/errors";
import { prisma } from "../utils/prisma";

export type ExpenseInput = {
  name: string;
  category?: string | null | undefined;
  amount: number;
  frequency: string;
  dueDate: string;
  reminderDays?: number | undefined;
  autopay?: boolean | undefined;
  notes?: string | null | undefined;
};

export const normalizeFrequency = (value: string): Frequency => {
  const upper = value.toUpperCase() as keyof typeof Frequency;
  return Frequency[upper] ?? Frequency.CUSTOM;
};

export const getExpensesForUser = async (userId: string) => {
  const expenses = await prisma.recurringExpense.findMany({
    where: { userId },
    orderBy: [
      {
        dueDate: "asc",
      },
    ],
    include: {
      notifications: {
        where: {
          status: "PENDING",
        },
        orderBy: { sendAt: "asc" },
      },
    },
  });

  type ExpenseWithNotifications = (typeof expenses)[number];

  return expenses.map((expense: ExpenseWithNotifications) => ({
    ...expense,
    amount: expense.amount.toNumber(),
  }));
};

export const createExpense = async (userId: string, input: ExpenseInput) => {
  const expense = await prisma.recurringExpense.create({
    data: {
      userId,
      name: input.name,
      category: input.category ?? null,
      amount: input.amount,
      frequency: normalizeFrequency(input.frequency),
      dueDate: new Date(input.dueDate),
      reminderDays: input.reminderDays ?? 3,
      autopay: input.autopay ?? false,
      notes: input.notes ?? null,
    },
  });

  return {
    ...expense,
    amount: expense.amount.toNumber(),
  };
};

export const updateExpense = async (userId: string, expenseId: string, input: Partial<ExpenseInput>) => {
  const existing = await prisma.recurringExpense.findUnique({
    where: { id: expenseId },
  });

  if (!existing || existing.userId !== userId) {
    throw new AppError("Expense not found", 404);
  }

  const expense = await prisma.recurringExpense.update({
    where: { id: expenseId },
    data: {
      name: input.name ?? existing.name,
      category: input.category ?? existing.category,
        amount: input.amount ?? existing.amount,
        frequency:
          input.frequency !== undefined ? normalizeFrequency(input.frequency) : existing.frequency,
      dueDate:
        input.dueDate !== undefined
          ? input.dueDate
            ? new Date(input.dueDate)
            : existing.dueDate
          : existing.dueDate,
      reminderDays: input.reminderDays ?? existing.reminderDays,
      autopay: input.autopay ?? existing.autopay,
      notes: input.notes ?? existing.notes,
    },
  });

  return {
    ...expense,
    amount: expense.amount.toNumber(),
  };
};

export const deleteExpense = async (userId: string, expenseId: string) => {
  const existing = await prisma.recurringExpense.findUnique({
    where: { id: expenseId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new AppError("Expense not found", 404);
  }

  await prisma.notification.deleteMany({ where: { expenseId } });

  return prisma.recurringExpense.delete({
    where: { id: expenseId },
  });
};

export const markExpensePaid = async (userId: string, expenseId: string, paidAt: string) => {
  const expense = await prisma.recurringExpense.findUnique({
    where: { id: expenseId },
  });

  if (!expense || expense.userId !== userId) {
    throw new AppError("Expense not found", 404);
  }

  const dueDate = new Date(expense.dueDate);
  const newDueDate = new Date(dueDate);

  switch (expense.frequency) {
    case "WEEKLY":
      newDueDate.setDate(newDueDate.getDate() + 7);
      break;
    case "BIWEEKLY":
      newDueDate.setDate(newDueDate.getDate() + 14);
      break;
    case "MONTHLY":
      newDueDate.setMonth(newDueDate.getMonth() + 1);
      break;
    case "QUARTERLY":
      newDueDate.setMonth(newDueDate.getMonth() + 3);
      break;
    case "YEARLY":
      newDueDate.setFullYear(newDueDate.getFullYear() + 1);
      break;
    default:
      newDueDate.setMonth(newDueDate.getMonth() + 1);
  }

  const updated = await prisma.recurringExpense.update({
    where: { id: expenseId },
    data: {
      lastPaidDate: new Date(paidAt),
      dueDate: newDueDate,
    },
  });

  return {
    ...updated,
    amount: updated.amount.toNumber(),
  };
};
