export declare const getNotificationsForUser: (userId: string) => Promise<{
    type: import("../generated/client/enums").NotificationType;
    message: string;
    id: string;
    createdAt: Date;
    userId: string;
    debtId: string | null;
    expenseId: string | null;
    status: import("../generated/client/enums").NotificationStatus;
    sendAt: Date;
    sentAt: Date | null;
    channel: string;
}[]>;
export declare const queueExpenseReminders: () => Promise<void>;
export declare const queueDebtPaymentReminders: () => Promise<void>;
export declare const dispatchPendingNotifications: () => Promise<void>;
//# sourceMappingURL=notificationService.d.ts.map