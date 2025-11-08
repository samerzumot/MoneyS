"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordDebtPayment = exports.deleteDebt = exports.updateDebt = exports.createDebt = exports.normalizeDebtType = exports.getDebtsForUser = void 0;
const enums_1 = require("../generated/client/enums");
const errors_1 = require("../utils/errors");
const prisma_1 = require("../utils/prisma");
const getDebtsForUser = async (userId) => {
    const debts = await prisma_1.prisma.debtAccount.findMany({
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
    return debts.map((debt) => ({
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
exports.getDebtsForUser = getDebtsForUser;
const normalizeDebtType = (value) => {
    const upper = value.toUpperCase();
    return enums_1.DebtType[upper] ?? enums_1.DebtType.OTHER;
};
exports.normalizeDebtType = normalizeDebtType;
const createDebt = async (userId, input) => {
    const debt = await prisma_1.prisma.debtAccount.create({
        data: {
            userId,
            name: input.name,
            type: (0, exports.normalizeDebtType)(input.type),
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
exports.createDebt = createDebt;
const updateDebt = async (userId, debtId, input) => {
    const existing = await prisma_1.prisma.debtAccount.findUnique({
        where: { id: debtId },
    });
    if (!existing || existing.userId !== userId) {
        throw new errors_1.AppError("Debt not found", 404);
    }
    const nextSuggestedPayment = input.minPayment !== undefined
        ? Math.max(input.minPayment, existing.suggestedPayment.toNumber())
        : existing.suggestedPayment.toNumber();
    const debt = await prisma_1.prisma.debtAccount.update({
        where: { id: debtId },
        data: {
            name: input.name ?? existing.name,
            type: input.type ? (0, exports.normalizeDebtType)(input.type) : existing.type,
            balance: input.balance ?? existing.balance,
            interestRate: input.interestRate ?? existing.interestRate,
            minPayment: input.minPayment ?? existing.minPayment,
            dueDate: input.dueDate !== undefined
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
exports.updateDebt = updateDebt;
const deleteDebt = async (userId, debtId) => {
    const existing = await prisma_1.prisma.debtAccount.findUnique({
        where: { id: debtId },
        select: { userId: true },
    });
    if (!existing || existing.userId !== userId) {
        throw new errors_1.AppError("Debt not found", 404);
    }
    await prisma_1.prisma.debtPayment.deleteMany({ where: { debtId } });
    await prisma_1.prisma.payoffPlanEntry.deleteMany({ where: { debtId } });
    return prisma_1.prisma.debtAccount.delete({
        where: { id: debtId },
    });
};
exports.deleteDebt = deleteDebt;
const recordDebtPayment = async (userId, debtId, amount, paymentDate) => {
    const debt = await prisma_1.prisma.debtAccount.findUnique({
        where: { id: debtId },
    });
    if (!debt || debt.userId !== userId) {
        throw new errors_1.AppError("Debt not found", 404);
    }
    const payment = await prisma_1.prisma.debtPayment.create({
        data: {
            debtId,
            amount,
            paymentDate: new Date(paymentDate),
        },
    });
    const updatedBalance = Math.max(debt.balance.toNumber() - amount, 0);
    await prisma_1.prisma.debtAccount.update({
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
exports.recordDebtPayment = recordDebtPayment;
//# sourceMappingURL=debtService.js.map