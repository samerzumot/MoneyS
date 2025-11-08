export type DebtType =
  | "CREDIT_CARD"
  | "LOAN"
  | "MORTGAGE"
  | "STUDENT_LOAN"
  | "BNPL"
  | "OTHER";

export type Frequency =
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "YEARLY"
  | "CUSTOM";

export interface DebtPayment {
  id: string;
  amount: number;
  paymentDate: string;
  createdAt: string;
}

export interface DebtAccount {
  id: string;
  name: string;
  type: DebtType;
  balance: number;
  interestRate: number;
  minPayment: number;
  suggestedPayment: number;
  dueDate: string | null;
  autopay: boolean;
  lastSyncedAt: string | null;
  payments: DebtPayment[];
}

export interface RecurringExpense {
  id: string;
  name: string;
  category: string | null;
  amount: number;
  frequency: Frequency;
  dueDate: string;
  reminderDays: number;
  autopay: boolean;
  notes: string | null;
  lastPaidDate: string | null;
}

export type NotificationType = "DEBT_PAYMENT" | "EXPENSE_REMINDER" | "PLAN_UPDATE";
export type NotificationStatus = "PENDING" | "SENT" | "SKIPPED";

export interface Notification {
  id: string;
  message: string;
  sendAt: string;
  sentAt: string | null;
  type: NotificationType;
  channel: string;
  expenseId?: string | null;
  debtId?: string | null;
}

export interface PayoffPlanEntry {
  id: string;
  debtId: string;
  month: number;
  year: number;
  payment: number;
  interestPortion: number;
  principalPortion: number;
  remainingBalance: number;
}

export interface PayoffPlan {
  id: string;
  strategy: string;
  totalInterestPaid: number;
  estimatedPayoffDate: string | null;
  createdAt: string;
  entries: PayoffPlanEntry[];
}

export interface DashboardTotals {
  totalDebt: number;
  totalMinimumPayments: number;
  averageInterestRate: number;
  estimatedPayoffDate: string | null;
  totalInterestProjected: number | null;
}

export interface DashboardDebtBreakdown {
  id: string;
  name: string;
  type: DebtType;
  balance: number;
  interestRate: number;
  minPayment: number;
  suggestedPayment: number;
  dueDate: string | null;
}

export interface DashboardChartPoint {
  date: string;
  remaining: number;
}

export interface DashboardDistributionSlice {
  type: string;
  value: number;
}

export interface DashboardInterestPrincipal {
  date: string;
  interest: number;
  principal: number;
}

export interface DashboardAlerts {
  upcomingExpenses: {
    id: string;
    name: string;
    dueDate: string;
    amount: number;
  }[];
  notifications: Notification[];
}

export interface DashboardSummary {
  totals: DashboardTotals;
  debtBreakdown: DashboardDebtBreakdown[];
  recurringExpenses: RecurringExpense[];
  charts: {
    debtOverTime: DashboardChartPoint[];
    debtDistribution: DashboardDistributionSlice[];
    interestVsPrincipal: DashboardInterestPrincipal[];
  };
  alerts: DashboardAlerts;
}

export interface UserConfig {
  plaid: {
    enabled: boolean;
    environment: string;
  };
  ai: {
    enabled: boolean;
  };
  notifications: {
    emailEnabled: boolean;
  };
}

export interface CurrentUserResponse {
  user: {
    id: string;
    firebaseUid: string;
    email?: string | null;
    displayName?: string | null;
  };
  config: UserConfig;
}
