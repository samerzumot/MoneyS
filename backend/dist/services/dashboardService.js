"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardSummary = void 0;
const prisma_1 = require("../utils/prisma");
const formatCurrency = (value) => Number(value.toFixed(2));
const buildDebtDistribution = (entries) => {
    const map = new Map();
    for (const { type, balance } of entries) {
        map.set(type, (map.get(type) ?? 0) + balance);
    }
    return Array.from(map.entries()).map(([type, value]) => ({
        type,
        value: formatCurrency(value),
    }));
};
const buildDebtOverTime = (planEntries) => {
    if (!planEntries?.length) {
        return [];
    }
    const map = new Map();
    for (const entry of planEntries) {
        const key = `${entry.year}-${entry.month.toString().padStart(2, "0")}`;
        map.set(key, (map.get(key) ?? 0) + entry.remainingBalance.toNumber());
    }
    return Array.from(map.entries())
        .map(([date, remaining]) => ({ date, remaining: formatCurrency(remaining) }))
        .slice(0, 24);
};
const buildInterestVsPrincipal = (planEntries) => {
    if (!planEntries?.length) {
        return [];
    }
    const map = new Map();
    for (const entry of planEntries) {
        const key = `${entry.year}-${entry.month.toString().padStart(2, "0")}`;
        const aggregate = map.get(key) ?? {
            date: key,
            interest: 0,
            principal: 0,
        };
        aggregate.interest += entry.interestPortion.toNumber();
        aggregate.principal += entry.principalPortion.toNumber();
        map.set(key, aggregate);
    }
    return Array.from(map.values())
        .map((item) => ({
        date: item.date,
        interest: formatCurrency(item.interest),
        principal: formatCurrency(item.principal),
    }))
        .slice(0, 12);
};
const mapNotifications = (rows) => rows.map((notification) => ({
    id: notification.id,
    message: notification.message,
    sendAt: notification.sendAt.toISOString(),
    type: notification.type,
    channel: notification.channel,
}));
const getDashboardSummary = async (userId) => {
    const [debts, expenses, latestPlan, notifications] = await Promise.all([
        prisma_1.prisma.debtAccount.findMany({
            where: { userId },
            include: {
                payments: {
                    orderBy: { paymentDate: "desc" },
                    take: 1,
                },
            },
            orderBy: {
                balance: "desc",
            },
        }),
        prisma_1.prisma.recurringExpense.findMany({
            where: { userId },
            orderBy: { dueDate: "asc" },
        }),
        prisma_1.prisma.payoffPlan.findFirst({
            where: { userId },
            orderBy: { createdAt: "desc" },
            include: {
                entries: true,
            },
        }),
        prisma_1.prisma.notification.findMany({
            where: {
                userId,
                status: "PENDING",
            },
            orderBy: { sendAt: "asc" },
        }),
    ]);
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance.toNumber(), 0);
    const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment.toNumber(), 0);
    const weightedInterest = debts.reduce((sum, debt) => {
        const balance = debt.balance.toNumber();
        return sum + debt.interestRate.toNumber() * balance;
    }, 0);
    const avgInterestRate = debts.length > 0 && totalDebt > 0 ? weightedInterest / totalDebt : 0;
    const upcomingExpenses = expenses.filter((expense) => {
        const diff = expense.dueDate.getTime() - Date.now();
        return diff >= 0 && diff <= 1000 * 60 * 60 * 24 * 14;
    });
    const debtBreakdown = debts.map((debt) => ({
        id: debt.id,
        name: debt.name,
        type: debt.type,
        balance: formatCurrency(debt.balance.toNumber()),
        interestRate: Number(debt.interestRate.toNumber().toFixed(2)),
        minPayment: formatCurrency(debt.minPayment.toNumber()),
        suggestedPayment: formatCurrency(debt.suggestedPayment.toNumber()),
        dueDate: debt.dueDate?.toISOString() ?? null,
    }));
    const expensesSummary = expenses.map((expense) => ({
        id: expense.id,
        name: expense.name,
        amount: formatCurrency(expense.amount.toNumber()),
        frequency: expense.frequency,
        dueDate: expense.dueDate.toISOString(),
        category: expense.category,
        reminderDays: expense.reminderDays,
        autopay: expense.autopay,
    }));
    const debtDistribution = buildDebtDistribution(debts.map((debt) => ({
        type: debt.type,
        balance: debt.balance.toNumber(),
    })));
    const debtOverTime = buildDebtOverTime(latestPlan?.entries);
    const interestVsPrincipal = buildInterestVsPrincipal(latestPlan?.entries);
    return {
        totals: {
            totalDebt: formatCurrency(totalDebt),
            totalMinimumPayments: formatCurrency(totalMinPayments),
            averageInterestRate: Number(avgInterestRate.toFixed(2)),
            estimatedPayoffDate: latestPlan?.estimatedPayoffDate?.toISOString() ?? null,
            totalInterestProjected: latestPlan?.totalInterestPaid.toNumber() ?? null,
        },
        debtBreakdown,
        recurringExpenses: expensesSummary,
        charts: {
            debtOverTime,
            debtDistribution,
            interestVsPrincipal,
        },
        alerts: {
            upcomingExpenses: upcomingExpenses.map((expense) => ({
                id: expense.id,
                name: expense.name,
                dueDate: expense.dueDate.toISOString(),
                amount: formatCurrency(expense.amount.toNumber()),
            })),
            notifications: mapNotifications(notifications),
        },
    };
};
exports.getDashboardSummary = getDashboardSummary;
//# sourceMappingURL=dashboardService.js.map