"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordPaymentHandler = exports.deleteDebtHandler = exports.updateDebtHandler = exports.createDebtHandler = exports.listDebts = void 0;
const zod_1 = require("zod");
const debtService_1 = require("../services/debtService");
const debtSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    type: zod_1.z.string().default("OTHER"),
    balance: zod_1.z.coerce.number().nonnegative(),
    interestRate: zod_1.z.coerce.number().min(0),
    minPayment: zod_1.z.coerce.number().nonnegative(),
    dueDate: zod_1.z
        .string()
        .datetime()
        .optional()
        .transform((value) => value ?? null),
    autopay: zod_1.z.boolean().optional(),
});
const debtUpdateSchema = debtSchema.partial();
const paymentSchema = zod_1.z.object({
    amount: zod_1.z.coerce.number().positive(),
    paymentDate: zod_1.z.string().datetime(),
});
const listDebts = async (req, res, next) => {
    try {
        const debts = await (0, debtService_1.getDebtsForUser)(req.user.id);
        res.json(debts);
    }
    catch (error) {
        next(error);
    }
};
exports.listDebts = listDebts;
const createDebtHandler = async (req, res, next) => {
    try {
        const payload = debtSchema.parse(req.body);
        const debt = await (0, debtService_1.createDebt)(req.user.id, payload);
        res.status(201).json(debt);
    }
    catch (error) {
        next(error);
    }
};
exports.createDebtHandler = createDebtHandler;
const updateDebtHandler = async (req, res, next) => {
    try {
        const parsed = debtUpdateSchema.parse(req.body);
        const payload = Object.fromEntries(Object.entries(parsed).filter(([, value]) => value !== undefined));
        const { debtId } = req.params;
        const debt = await (0, debtService_1.updateDebt)(req.user.id, debtId, payload);
        res.json(debt);
    }
    catch (error) {
        next(error);
    }
};
exports.updateDebtHandler = updateDebtHandler;
const deleteDebtHandler = async (req, res, next) => {
    try {
        const { debtId } = req.params;
        await (0, debtService_1.deleteDebt)(req.user.id, debtId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDebtHandler = deleteDebtHandler;
const recordPaymentHandler = async (req, res, next) => {
    try {
        const { debtId } = req.params;
        const payload = paymentSchema.parse(req.body);
        const payment = await (0, debtService_1.recordDebtPayment)(req.user.id, debtId, payload.amount, payload.paymentDate);
        res.status(201).json(payment);
    }
    catch (error) {
        next(error);
    }
};
exports.recordPaymentHandler = recordPaymentHandler;
//# sourceMappingURL=debtController.js.map