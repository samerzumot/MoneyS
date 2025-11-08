type Strategy = "avalanche" | "snowball" | "balanced";
export type PlanPreferences = {
    monthlyBudget: number;
    strategy?: Strategy | undefined;
    emergencyBuffer?: number | undefined;
    includeAIExplanation?: boolean | undefined;
};
type PlanEntry = {
    debtId: string;
    month: number;
    year: number;
    payment: number;
    interestPortion: number;
    principalPortion: number;
    remainingBalance: number;
};
export declare const generatePayoffPlan: (userId: string, preferences: PlanPreferences) => Promise<{
    strategy: Strategy;
    monthlyBudget: number;
    totalInterestPaid: number;
    estimatedPayoffDate: string;
    monthsToPayoff: number;
    schedule: PlanEntry[];
    aiInsights: string | null;
}>;
export declare const getLatestPayoffPlan: (userId: string) => Promise<{
    totalInterestPaid: number;
    entries: {
        payment: number;
        interestPortion: number;
        principalPortion: number;
        remainingBalance: number;
        id: string;
        createdAt: Date;
        planId: string;
        debtId: string;
        month: number;
        year: number;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    strategy: string;
    estimatedPayoffDate: Date | null;
} | null>;
export {};
//# sourceMappingURL=planService.d.ts.map