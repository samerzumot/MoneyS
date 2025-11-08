import type { NextFunction, Response } from "express";
import { z } from "zod";
import type { AuthenticatedRequest } from "../middleware/auth";
import type { DebtInput } from "../services/debtService";
import {
  createDebt,
  deleteDebt,
  getDebtsForUser,
  recordDebtPayment,
  updateDebt,
} from "../services/debtService";

const debtSchema = z.object({
  name: z.string().min(1),
  type: z.string().default("OTHER"),
  balance: z.coerce.number().nonnegative(),
  interestRate: z.coerce.number().min(0),
  minPayment: z.coerce.number().nonnegative(),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .transform((value) => value ?? null),
  autopay: z.boolean().optional(),
});

const debtUpdateSchema = debtSchema.partial();

const paymentSchema = z.object({
  amount: z.coerce.number().positive(),
  paymentDate: z.string().datetime(),
});

export const listDebts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const debts = await getDebtsForUser(req.user!.id);
    res.json(debts);
  } catch (error) {
    next(error);
  }
};

export const createDebtHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = debtSchema.parse(req.body);
    const debt = await createDebt(req.user!.id, payload);
    res.status(201).json(debt);
  } catch (error) {
    next(error);
  }
};

export const updateDebtHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = debtUpdateSchema.parse(req.body);
    const payload = Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value !== undefined),
    ) as Partial<DebtInput>;
    const { debtId } = req.params as { debtId: string };
    const debt = await updateDebt(req.user!.id, debtId, payload);
    res.json(debt);
  } catch (error) {
    next(error);
  }
};

export const deleteDebtHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { debtId } = req.params as { debtId: string };
    await deleteDebt(req.user!.id, debtId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const recordPaymentHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { debtId } = req.params as { debtId: string };
    const payload = paymentSchema.parse(req.body);
    const payment = await recordDebtPayment(
      req.user!.id,
      debtId,
      payload.amount,
      payload.paymentDate,
    );
    res.status(201).json(payment);
  } catch (error) {
    next(error);
  }
};
