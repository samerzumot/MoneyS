"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPayoffPlan = exports.generatePayoffPlan = void 0;
const openai_1 = require("openai");
const env_1 = require("../config/env");
const errors_1 = require("../utils/errors");
const prisma_1 = require("../utils/prisma");
const openAIClient = env_1.ENV.openAI.apiKey ? new openai_1.OpenAI({ apiKey: env_1.ENV.openAI.apiKey }) : null;
const sortDebts = (debts, strategy) => {
    switch (strategy) {
        case "snowball":
            return [...debts].sort((a, b) => a.balance - b.balance);
        case "balanced":
            return [...debts].sort((a, b) => b.interestRate - a.interestRate || (a.balance - b.balance) / Math.max(a.balance, 1));
        case "avalanche":
        default:
            return [...debts].sort((a, b) => b.interestRate - a.interestRate);
    }
};
const buildPlanSchedule = (debts, monthlyBudget, strategy) => {
    const plan = [];
    const debtState = debts.map((debt) => ({
        ...debt,
        balance: debt.balance,
    }));
    let monthIndex = 0;
    const maxMonths = 360;
    let totalInterestPaid = 0;
    while (debtState.some((debt) => debt.balance > 0.01) && monthIndex < maxMonths) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + monthIndex);
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        let remainingBudget = monthlyBudget;
        const activeDebts = sortDebts(debtState.filter((debt) => debt.balance > 0.01), strategy);
        const priorityDebtId = activeDebts[0]?.id;
        for (const debt of activeDebts) {
            const monthlyRate = debt.interestRate / 100 / 12;
            const interestDue = debt.balance * monthlyRate;
            const minimumDue = Math.min(debt.minPayment, debt.balance + interestDue);
            if (remainingBudget < minimumDue - 0.01) {
                throw new errors_1.AppError("Monthly budget is not sufficient to cover minimum payments. Increase your budget or adjust expenses.", 400);
            }
            let payment = minimumDue;
            remainingBudget -= payment;
            // Allocate extra budget to the highest-priority debt first.
            const isHighestPriority = priorityDebtId === debt.id;
            if (isHighestPriority && remainingBudget > 0) {
                const maxExtra = debt.balance + interestDue - payment;
                const extraPayment = Math.min(remainingBudget, Math.max(maxExtra, 0));
                payment += extraPayment;
                remainingBudget -= extraPayment;
            }
            // If we still have budget left after the top debt was paid off this month, push remaining to next debt.
            if (!isHighestPriority && remainingBudget > 0.01 && debt.balance - payment > 0) {
                const maxExtra = debt.balance + interestDue - payment;
                if (maxExtra > 0) {
                    const extraPayment = Math.min(remainingBudget, maxExtra);
                    payment += extraPayment;
                    remainingBudget -= extraPayment;
                }
            }
            const totalDueThisMonth = debt.balance + interestDue;
            if (payment > totalDueThisMonth) {
                const overpay = payment - totalDueThisMonth;
                payment -= overpay;
                remainingBudget += overpay;
            }
            const interestPaid = Math.min(interestDue, payment);
            const principalPaid = payment - interestPaid;
            totalInterestPaid += interestPaid;
            debt.balance = Math.max(debt.balance + interestDue - payment, 0);
            plan.push({
                debtId: debt.id,
                month: currentMonth,
                year: currentYear,
                payment: Number(payment.toFixed(2)),
                interestPortion: Number(interestPaid.toFixed(2)),
                principalPortion: Number(principalPaid.toFixed(2)),
                remainingBalance: Number(debt.balance.toFixed(2)),
            });
        }
        monthIndex += 1;
    }
    if (monthIndex >= maxMonths) {
        throw new errors_1.AppError("Unable to calculate payoff plan within 30 years. Review your inputs.", 400);
    }
    const estimatedPayoffDate = new Date();
    estimatedPayoffDate.setMonth(estimatedPayoffDate.getMonth() + monthIndex - 1);
    return { plan, totalInterestPaid, estimatedPayoffDate };
};
const createAIInsights = async (payload) => {
    if (!openAIClient) {
        return null;
    }
    try {
        const response = await openAIClient.responses.create({
            model: "gpt-4.1-mini",
            input: [
                {
                    role: "system",
                    content: "You are a helpful financial coach. Provide concise, encouraging advice (max 120 words) based on the proposed debt payoff plan. Be specific and actionable.",
                },
                {
                    role: "user",
                    content: JSON.stringify(payload),
                },
            ],
            max_output_tokens: 300,
        });
        const text = response.output_text ??
            response.output?.map((segment) => ("text" in segment ? segment.text : "")).join(" ");
        return text?.trim() ?? null;
    }
    catch (error) {
        console.error("Failed fetching AI insight", error);
        return null;
    }
};
const generatePayoffPlan = async (userId, preferences) => {
    if (!preferences.monthlyBudget || preferences.monthlyBudget <= 0) {
        throw new errors_1.AppError("Monthly budget must be greater than 0", 400);
    }
    const debts = await prisma_1.prisma.debtAccount.findMany({
        where: { userId },
    });
    if (debts.length === 0) {
        throw new errors_1.AppError("You need at least one debt to generate a payoff plan", 400);
    }
    const totalMinimums = debts.reduce((sum, debt) => sum + debt.minPayment.toNumber(), 0);
    if (preferences.monthlyBudget < totalMinimums - 0.01) {
        throw new errors_1.AppError(`Monthly budget (${preferences.monthlyBudget.toFixed(2)}) is below total minimum payments (${totalMinimums.toFixed(2)}).`, 400);
    }
    const strategy = preferences.strategy ?? "avalanche";
    const standardizedDebts = debts.map((debt) => ({
        id: debt.id,
        name: debt.name,
        balance: debt.balance.toNumber(),
        interestRate: debt.interestRate.toNumber(),
        minPayment: debt.minPayment.toNumber(),
    }));
    const { plan, totalInterestPaid, estimatedPayoffDate } = buildPlanSchedule(standardizedDebts, preferences.monthlyBudget, strategy);
    await prisma_1.prisma.$transaction(async (trx) => {
        await trx.payoffPlanEntry.deleteMany({
            where: {
                plan: {
                    userId,
                },
            },
        });
        await trx.payoffPlan.deleteMany({
            where: { userId },
        });
        const record = await trx.payoffPlan.create({
            data: {
                userId,
                strategy,
                totalInterestPaid,
                estimatedPayoffDate,
            },
        });
        await trx.payoffPlanEntry.createMany({
            data: plan.map((entry) => ({
                planId: record.id,
                debtId: entry.debtId,
                month: entry.month,
                year: entry.year,
                payment: entry.payment,
                interestPortion: entry.interestPortion,
                principalPortion: entry.principalPortion,
                remainingBalance: entry.remainingBalance,
            })),
        });
    });
    const monthsToPayoff = plan.length / debts.length;
    const aiInsights = preferences.includeAIExplanation
        ? await createAIInsights({
            totalInterest: Number(totalInterestPaid.toFixed(2)),
            months: Math.ceil(monthsToPayoff),
            monthlyBudget: preferences.monthlyBudget,
            strategy,
            debts: standardizedDebts,
        })
        : null;
    return {
        strategy,
        monthlyBudget: preferences.monthlyBudget,
        totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
        estimatedPayoffDate: estimatedPayoffDate.toISOString(),
        monthsToPayoff: Math.ceil(monthsToPayoff),
        schedule: plan,
        aiInsights,
    };
};
exports.generatePayoffPlan = generatePayoffPlan;
const getLatestPayoffPlan = async (userId) => {
    const plan = await prisma_1.prisma.payoffPlan.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            entries: {
                orderBy: [{ year: "asc" }, { month: "asc" }],
            },
        },
    });
    if (!plan) {
        return null;
    }
    return {
        ...plan,
        totalInterestPaid: plan.totalInterestPaid.toNumber(),
        entries: plan.entries.map((entry) => ({
            ...entry,
            payment: entry.payment.toNumber(),
            interestPortion: entry.interestPortion.toNumber(),
            principalPortion: entry.principalPortion.toNumber(),
            remainingBalance: entry.remainingBalance.toNumber(),
        })),
    };
};
exports.getLatestPayoffPlan = getLatestPayoffPlan;
//# sourceMappingURL=planService.js.map