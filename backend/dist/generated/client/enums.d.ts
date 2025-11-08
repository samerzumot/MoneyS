export declare const DebtType: {
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly LOAN: "LOAN";
    readonly MORTGAGE: "MORTGAGE";
    readonly STUDENT_LOAN: "STUDENT_LOAN";
    readonly BNPL: "BNPL";
    readonly OTHER: "OTHER";
};
export type DebtType = (typeof DebtType)[keyof typeof DebtType];
export declare const Frequency: {
    readonly WEEKLY: "WEEKLY";
    readonly BIWEEKLY: "BIWEEKLY";
    readonly MONTHLY: "MONTHLY";
    readonly QUARTERLY: "QUARTERLY";
    readonly YEARLY: "YEARLY";
    readonly CUSTOM: "CUSTOM";
};
export type Frequency = (typeof Frequency)[keyof typeof Frequency];
export declare const NotificationType: {
    readonly DEBT_PAYMENT: "DEBT_PAYMENT";
    readonly EXPENSE_REMINDER: "EXPENSE_REMINDER";
    readonly PLAN_UPDATE: "PLAN_UPDATE";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationStatus: {
    readonly PENDING: "PENDING";
    readonly SENT: "SENT";
    readonly SKIPPED: "SKIPPED";
};
export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus];
//# sourceMappingURL=enums.d.ts.map