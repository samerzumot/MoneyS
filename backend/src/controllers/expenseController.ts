import type { NextFunction, Response } from "express";
import { z } from "zod";
import type { AuthenticatedRequest } from "../middleware/auth";
import {
  createExpense,
  deleteExpense,
  getExpensesForUser,
  markExpensePaid,
  updateExpense,
} from "../services/expenseService";
import type { ExpenseInput } from "../services/expenseService";

const expenseSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
  amount: z.coerce.number().positive(),
  frequency: z
    .string()
    .min(1)
    .transform((value) => value.toUpperCase()),
  dueDate: z.string().datetime(),
  reminderDays: z.coerce.number().int().min(0).max(30).optional(),
  autopay: z.boolean().optional(),
  notes: z.string().optional(),
});

const expenseUpdateSchema = expenseSchema.partial();

const paidSchema = z.object({
  paidAt: z.string().datetime(),
});

export const listExpenses = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const expenses = await getExpensesForUser(req.user!.id);
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

export const createExpenseHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = expenseSchema.parse(req.body);
    const expense = await createExpense(req.user!.id, payload);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

export const updateExpenseHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params as { expenseId: string };
    const parsed = expenseUpdateSchema.parse(req.body);
    const payload = Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value !== undefined),
    ) as Partial<ExpenseInput>;
    const expense = await updateExpense(req.user!.id, expenseId, payload);
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

export const deleteExpenseHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params as { expenseId: string };
    await deleteExpense(req.user!.id, expenseId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const markExpensePaidHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params as { expenseId: string };
    const payload = paidSchema.parse(req.body);
    const expense = await markExpensePaid(req.user!.id, expenseId, payload.paidAt);
    res.json(expense);
  } catch (error) {
    next(error);
  }
};
