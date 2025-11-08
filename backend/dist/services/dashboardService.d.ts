export declare const getDashboardSummary: (userId: string) => Promise<{
    totals: {
        totalDebt: number;
        totalMinimumPayments: number;
        averageInterestRate: number;
        estimatedPayoffDate: string | null;
        totalInterestProjected: number | null;
    };
    debtBreakdown: {
        id: string;
        name: string;
        type: import("../generated/client/enums").DebtType;
        balance: number;
        interestRate: number;
        minPayment: number;
        suggestedPayment: number;
        dueDate: string | null;
    }[];
    recurringExpenses: {
        id: string;
        name: string;
        amount: number;
        frequency: import("../generated/client/enums").Frequency;
        dueDate: string;
        category: string | null;
        reminderDays: number;
        autopay: boolean;
    }[];
    charts: {
        debtOverTime: {
            date: string;
            remaining: number;
        }[];
        debtDistribution: {
            type: string;
            value: number;
        }[];
        interestVsPrincipal: {
            date: string;
            interest: number;
            principal: number;
        }[];
    };
    alerts: {
        upcomingExpenses: {
            id: string;
            name: string;
            dueDate: string;
            amount: number;
        }[];
        notifications: {
            id: string;
            message: string;
            sendAt: string;
            type: import("../generated/client/enums").NotificationType;
            channel: string;
        }[];
    };
}>;
//# sourceMappingURL=dashboardService.d.ts.map