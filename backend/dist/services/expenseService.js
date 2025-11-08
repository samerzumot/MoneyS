"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markExpensePaid = exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.getExpensesForUser = exports.normalizeFrequency = void 0;
const enums_1 = require("../generated/client/enums");
const errors_1 = require("../utils/errors");
const prisma_1 = require("../utils/prisma");
const normalizeFrequency = (value) => {
    const upper = value.toUpperCase();
    return enums_1.Frequency[upper] ?? enums_1.Frequency.CUSTOM;
};
exports.normalizeFrequency = normalizeFrequency;
const getExpensesForUser = async (userId) => {
    const expenses = await prisma_1.prisma.recurringExpense.findMany({
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
    return expenses.map((expense) => ({
        ...expense,
        amount: expense.amount.toNumber(),
    }));
};
exports.getExpensesForUser = getExpensesForUser;
const createExpense = async (userId, input) => {
    const expense = await prisma_1.prisma.recurringExpense.create({
        data: {
            userId,
            name: input.name,
            category: input.category ?? null,
            amount: input.amount,
            frequency: (0, exports.normalizeFrequency)(input.frequency),
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
exports.createExpense = createExpense;
const updateExpense = async (userId, expenseId, input) => {
    const existing = await prisma_1.prisma.recurringExpense.findUnique({
        where: { id: expenseId },
    });
    if (!existing || existing.userId !== userId) {
        throw new errors_1.AppError("Expense not found", 404);
    }
    const expense = await prisma_1.prisma.recurringExpense.update({
        where: { id: expenseId },
        data: {
            name: input.name ?? existing.name,
            category: input.category ?? existing.category,
            amount: input.amount ?? existing.amount,
            frequency: input.frequency !== undefined ? (0, exports.normalizeFrequency)(input.frequency) : existing.frequency,
            dueDate: input.dueDate !== undefined
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
exports.updateExpense = updateExpense;
const deleteExpense = async (userId, expenseId) => {
    const existing = await prisma_1.prisma.recurringExpense.findUnique({
        where: { id: expenseId },
        select: { userId: true },
    });
    if (!existing || existing.userId !== userId) {
        throw new errors_1.AppError("Expense not found", 404);
    }
    await prisma_1.prisma.notification.deleteMany({ where: { expenseId } });
    return prisma_1.prisma.recurringExpense.delete({
        where: { id: expenseId },
    });
};
exports.deleteExpense = deleteExpense;
const markExpensePaid = async (userId, expenseId, paidAt) => {
    const expense = await prisma_1.prisma.recurringExpense.findUnique({
        where: { id: expenseId },
    });
    if (!expense || expense.userId !== userId) {
        throw new errors_1.AppError("Expense not found", 404);
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
    const updated = await prisma_1.prisma.recurringExpense.update({
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
exports.markExpensePaid = markExpensePaid;
//# sourceMappingURL=expenseService.js.map