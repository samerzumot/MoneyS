import { DebtType } from "../generated/client/enums";
import { AppError } from "../utils/errors";
import { prisma } from "../utils/prisma";

export const getDebtsForUser = async (userId: string) => {
  const debts = await prisma.debtAccount.findMany({
    where: { userId },
    include: {
      payments: {
        orderBy: { paymentDate: "desc" },
        take: 6,
      },
    },
    orderBy: {
      balance: "desc",
    },
  });

  type DebtWithPayments = (typeof debts)[number];

  return debts.map((debt: DebtWithPayments) => ({
    ...debt,
    balance: debt.balance.toNumber(),
    interestRate: debt.interestRate.toNumber(),
    minPayment: debt.minPayment.toNumber(),
    suggestedPayment: debt.suggestedPayment.toNumber(),
    payments: debt.payments.map((payment) => ({
      ...payment,
      amount: payment.amount.toNumber(),
    })),
  }));
};

export type DebtInput = {
  name: string;
  type: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  dueDate?: string | null | undefined;
  autopay?: boolean | undefined;
  plaidAccountId?: string | null | undefined;
  plaidItemId?: string | null | undefined;
};

export const normalizeDebtType = (value: string): DebtType => {
  const upper = value.toUpperCase() as keyof typeof DebtType;
  return DebtType[upper] ?? DebtType.OTHER;
};

export const createDebt = async (userId: string, input: DebtInput) => {
  const debt = await prisma.debtAccount.create({
    data: {
      userId,
      name: input.name,
      type: normalizeDebtType(input.type),
      balance: input.balance,
      interestRate: input.interestRate,
      minPayment: input.minPayment,
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
      autopay: input.autopay ?? false,
      plaidAccountId: input.plaidAccountId ?? null,
      plaidItemId: input.plaidItemId ?? null,
    },
  });

  return {
    ...debt,
    balance: debt.balance.toNumber(),
    interestRate: debt.interestRate.toNumber(),
    minPayment: debt.minPayment.toNumber(),
    suggestedPayment: debt.suggestedPayment.toNumber(),
  };
};

export const updateDebt = async (userId: string, debtId: string, input: Partial<DebtInput>) => {
  const existing = await prisma.debtAccount.findUnique({
    where: { id: debtId },
  });

  if (!existing || existing.userId !== userId) {
    throw new AppError("Debt not found", 404);
  }

  const nextSuggestedPayment =
    input.minPayment !== undefined
      ? Math.max(input.minPayment, existing.suggestedPayment.toNumber())
      : existing.suggestedPayment.toNumber();

  const debt = await prisma.debtAccount.update({
    where: { id: debtId },
    data: {
      name: input.name ?? existing.name,
      type: input.type ? normalizeDebtType(input.type) : existing.type,
      balance: input.balance ?? existing.balance,
      interestRate: input.interestRate ?? existing.interestRate,
      minPayment: input.minPayment ?? existing.minPayment,
      dueDate:
        input.dueDate !== undefined
          ? input.dueDate
            ? new Date(input.dueDate)
            : null
          : existing.dueDate,
      autopay: input.autopay ?? existing.autopay,
      suggestedPayment: nextSuggestedPayment,
    },
  });

  return {
    ...debt,
    balance: debt.balance.toNumber(),
    interestRate: debt.interestRate.toNumber(),
    minPayment: debt.minPayment.toNumber(),
    suggestedPayment: debt.suggestedPayment.toNumber(),
  };
};

export const deleteDebt = async (userId: string, debtId: string) => {
  const existing = await prisma.debtAccount.findUnique({
    where: { id: debtId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    throw new AppError("Debt not found", 404);
  }

  await prisma.debtPayment.deleteMany({ where: { debtId } });
  await prisma.payoffPlanEntry.deleteMany({ where: { debtId } });

  return prisma.debtAccount.delete({
    where: { id: debtId },
  });
};

export const recordDebtPayment = async (
  userId: string,
  debtId: string,
  amount: number,
  paymentDate: string,
) => {
  const debt = await prisma.debtAccount.findUnique({
    where: { id: debtId },
  });

  if (!debt || debt.userId !== userId) {
    throw new AppError("Debt not found", 404);
  }

  const payment = await prisma.debtPayment.create({
    data: {
      debtId,
      amount,
      paymentDate: new Date(paymentDate),
    },
  });

  const updatedBalance = Math.max(debt.balance.toNumber() - amount, 0);
  await prisma.debtAccount.update({
    where: { id: debtId },
    data: {
      balance: updatedBalance,
      updatedAt: new Date(),
    },
  });

  return {
    ...payment,
    amount: payment.amount.toNumber(),
  };
};
