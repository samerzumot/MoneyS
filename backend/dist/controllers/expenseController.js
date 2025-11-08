"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markExpensePaidHandler = exports.deleteExpenseHandler = exports.updateExpenseHandler = exports.createExpenseHandler = exports.listExpenses = void 0;
const zod_1 = require("zod");
const expenseService_1 = require("../services/expenseService");
const expenseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    category: zod_1.z.string().optional(),
    amount: zod_1.z.coerce.number().positive(),
    frequency: zod_1.z
        .string()
        .min(1)
        .transform((value) => value.toUpperCase()),
    dueDate: zod_1.z.string().datetime(),
    reminderDays: zod_1.z.coerce.number().int().min(0).max(30).optional(),
    autopay: zod_1.z.boolean().optional(),
    notes: zod_1.z.string().optional(),
});
const expenseUpdateSchema = expenseSchema.partial();
const paidSchema = zod_1.z.object({
    paidAt: zod_1.z.string().datetime(),
});
const listExpenses = async (req, res, next) => {
    try {
        const expenses = await (0, expenseService_1.getExpensesForUser)(req.user.id);
        res.json(expenses);
    }
    catch (error) {
        next(error);
    }
};
exports.listExpenses = listExpenses;
const createExpenseHandler = async (req, res, next) => {
    try {
        const payload = expenseSchema.parse(req.body);
        const expense = await (0, expenseService_1.createExpense)(req.user.id, payload);
        res.status(201).json(expense);
    }
    catch (error) {
        next(error);
    }
};
exports.createExpenseHandler = createExpenseHandler;
const updateExpenseHandler = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const parsed = expenseUpdateSchema.parse(req.body);
        const payload = Object.fromEntries(Object.entries(parsed).filter(([, value]) => value !== undefined));
        const expense = await (0, expenseService_1.updateExpense)(req.user.id, expenseId, payload);
        res.json(expense);
    }
    catch (error) {
        next(error);
    }
};
exports.updateExpenseHandler = updateExpenseHandler;
const deleteExpenseHandler = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        await (0, expenseService_1.deleteExpense)(req.user.id, expenseId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteExpenseHandler = deleteExpenseHandler;
const markExpensePaidHandler = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const payload = paidSchema.parse(req.body);
        const expense = await (0, expenseService_1.markExpensePaid)(req.user.id, expenseId, payload.paidAt);
        res.json(expense);
    }
    catch (error) {
        next(error);
    }
};
exports.markExpensePaidHandler = markExpensePaidHandler;
//# sourceMappingURL=expenseController.js.map