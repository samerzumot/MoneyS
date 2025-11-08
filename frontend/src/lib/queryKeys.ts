export const queryKeys = {
  dashboard: ["dashboard-summary"] as const,
  debts: ["debts"] as const,
  expenses: ["expenses"] as const,
  notifications: ["notifications"] as const,
  user: ["current-user"] as const,
  plan: {
    latest: ["payoff-plan", "latest"] as const,
  },
  plaid: {
    linkToken: ["plaid", "link-token"] as const,
  },
};
