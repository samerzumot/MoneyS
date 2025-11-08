import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useDashboardSummary } from "./api/useDashboardSummary";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { useLatestPayoffPlan } from "../plan/api/usePayoffPlan";
import { useMemo } from "react";
import type { DashboardSummary } from "../../types/api";
import { useAuth } from "../../lib/authContext";
import dayjs from "dayjs";

const chartPalette = ["#3d74f6", "#eb5298", "#2cb67d", "#f4a259", "#aa7df1", "#f25f5c"];

const StatCard = ({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string;
  value: string;
  subtitle?: string;
  accent?: string;
}) => (
  <div className="rounded-3xl bg-white p-6 shadow-card">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    {subtitle ? <p className="mt-2 text-sm text-slate-500">{subtitle}</p> : null}
    {accent ? (
      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
        <SparklesIcon className="h-4 w-4" />
        {accent}
      </span>
    ) : null}
  </div>
);

const formatCurrency = (amount: number, prefix = "$") =>
  `${prefix}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const DebtAlerts = ({
  summary,
}: {
  summary: DashboardSummary;
}) => (
  <div className="rounded-3xl bg-white p-6 shadow-card">
    <h3 className="text-lg font-semibold text-slate-900">Alerts & Reminders</h3>
    <div className="mt-4 space-y-4">
      {summary.alerts.upcomingExpenses.length === 0 && summary.alerts.notifications.length === 0 ? (
        <p className="text-sm text-slate-500">No urgent alerts. You are all caught up!</p>
      ) : null}
      {summary.alerts.upcomingExpenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-slate-800">{expense.name}</p>
            <p className="text-xs text-slate-500">
              Due {dayjs(expense.dueDate).format("MMM D")} · {formatCurrency(expense.amount)}
            </p>
          </div>
          <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning">
            Expense
          </span>
        </div>
      ))}
      {summary.alerts.notifications.map((notification) => (
        <div
          key={notification.id}
          className="rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-primary-800"
        >
          <p className="text-sm font-semibold">{notification.message}</p>
          <p className="text-xs text-primary-700">
            Send by {dayjs(notification.sendAt).format("MMM D, h:mm A")}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: summary, isLoading } = useDashboardSummary();
  const { data: latestPlan } = useLatestPayoffPlan();

  const aiInsights = latestPlan?.entries?.length
    ? `You can be debt free by ${dayjs(latestPlan.estimatedPayoffDate).format(
        "MMMM YYYY",
      )} if you follow the ${latestPlan.strategy} plan.`
    : "Connect your accounts and generate a payoff plan to unlock AI insights.";

  const debtDistributionData = useMemo(
    () =>
      summary?.charts.debtDistribution.map((slice, index) => ({
        ...slice,
        fill: chartPalette[index % chartPalette.length],
      })) ?? [],
    [summary],
  );

  if (isLoading || !summary) {
    return <LoadingScreen message="Fetching latest balances..." />;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-4">
        <StatCard
          title="Total Debt"
          value={formatCurrency(summary.totals.totalDebt)}
          subtitle="Across all connected accounts"
          accent="AI prioritizing highest interest"
        />
        <StatCard
          title="Monthly Minimums"
          value={formatCurrency(summary.totals.totalMinimumPayments)}
          subtitle="Required to stay current"
        />
        <StatCard
          title="Avg Interest Rate"
          value={formatPercent(summary.totals.averageInterestRate)}
          subtitle="Weighted across open balances"
        />
        <StatCard
          title="Projected Payoff"
          value={
            summary.totals.estimatedPayoffDate
              ? dayjs(summary.totals.estimatedPayoffDate).format("MMM YYYY")
              : "Generate plan"
          }
          subtitle={
            summary.totals.totalInterestProjected
              ? `Estimated interest: ${formatCurrency(summary.totals.totalInterestProjected)}`
              : "Create an AI plan to see savings"
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Debt Balance Trend</h3>
              <p className="text-sm text-slate-500">
                Track progress toward {user?.displayName?.split(" ")[0] ?? "your"} debt-free date.
              </p>
            </div>
          </div>
          <div className="mt-6 h-56 w-full">
            <ResponsiveContainer>
              <LineChart data={summary.charts.debtOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7f1" />
                <XAxis dataKey="date" stroke="#90a4c3" fontSize={12} />
                <YAxis stroke="#90a4c3" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: 16 }}
                />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="#3d74f6"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Debt Distribution</h3>
          <p className="text-sm text-slate-500">See how balances stack across accounts.</p>
          <div className="mt-6 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={debtDistributionData}
                  dataKey="value"
                  nameKey="type"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {debtDistributionData.map((slice) => (
                    <Cell key={slice.type} fill={slice.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name) => [`${formatCurrency(value as number)}`, name]}
                  contentStyle={{ borderRadius: 16 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {debtDistributionData.map((slice) => (
              <div key={slice.type} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: slice.fill }}
                  />
                  <span className="text-slate-600">{slice.type}</span>
                </div>
                <span className="font-medium text-slate-900">{formatCurrency(slice.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-3">
          <h3 className="text-lg font-semibold text-slate-900">Interest vs Principal</h3>
          <p className="text-sm text-slate-500">
            Monitor how each payment is accelerating principal reduction.
          </p>
          <div className="mt-6 h-60">
            <ResponsiveContainer>
              <BarChart data={summary.charts.interestVsPrincipal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7f1" />
                <XAxis dataKey="date" stroke="#90a4c3" fontSize={12} />
                <YAxis stroke="#90a4c3" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="interest" fill="#f25f5c" radius={[6, 6, 0, 0]} />
                <Bar dataKey="principal" fill="#3d74f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-6 text-white shadow-card">
            <h3 className="text-lg font-semibold">AI Insight</h3>
            <p className="mt-3 text-sm text-primary-50">{aiInsights}</p>
          </div>
          <DebtAlerts summary={summary} />
        </div>
      </section>
    </div>
  );
};
