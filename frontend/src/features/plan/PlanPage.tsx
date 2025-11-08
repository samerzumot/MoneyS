import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import clsx from "clsx";
import {
  useGeneratePayoffPlan,
  useLatestPayoffPlan,
} from "./api/usePayoffPlan";
import { useDebts } from "../debts/api/useDebts";
import { LoadingScreen } from "../../components/common/LoadingScreen";

const planFormSchema = z.object({
  monthlyBudget: z.number().min(0),
  strategy: z.enum(["avalanche", "snowball", "balanced"]),
  includeAIExplanation: z.boolean().optional(),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

const strategyDescriptions: Record<PlanFormValues["strategy"], string> = {
  avalanche:
    "Prioritize highest interest balances first to minimize total interest paid.",
  snowball:
    "Attack smallest balances for faster wins and motivation along the journey.",
  balanced:
    "Blend avalanche and snowball to smooth cash flow while saving on interest.",
};

export const PlanPage = () => {
  const { data: plan, isLoading } = useLatestPayoffPlan();
  const { data: debts } = useDebts();
  const generatePlan = useGeneratePayoffPlan();

  const recommendedBudget = useMemo(
    () => debts?.reduce((sum, debt) => sum + debt.minPayment, 0) ?? 0,
    [debts],
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      strategy: "avalanche",
      includeAIExplanation: true,
      monthlyBudget: Math.round(recommendedBudget * 1.15 * 100) / 100,
    },
  });

  useEffect(() => {
    if (!recommendedBudget) return;
    reset((prev) => ({
      ...prev,
      monthlyBudget: Math.round(recommendedBudget * 1.15 * 100) / 100,
    }));
  }, [recommendedBudget, reset]);

  const onSubmit = handleSubmit(async (values) => {
    await generatePlan.mutateAsync({
      ...values,
    });
  });

  if (isLoading && !plan) {
    return <LoadingScreen message="Calculating optimal payoff plan..." />;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Create Payoff Plan
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tell us how much cash you can safely allocate toward debt repayment
            each month. We will optimize how that money flows across your
            accounts.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Monthly Budget
              </label>
              <input
                type="number"
                step="0.01"
                {...register("monthlyBudget", { valueAsNumber: true })}
                className={clsx(
                  "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                  errors.monthlyBudget ? "border-danger" : "border-slate-200",
                )}
              />
              <p className="mt-1 text-xs text-slate-500">
                Recommended minimum: {formatCurrency(recommendedBudget)}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Strategy
              </label>
              <select
                {...register("strategy")}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
              >
                <option value="avalanche">
                  Avalanche (highest rate first)
                </option>
                <option value="snowball">
                  Snowball (smallest balance first)
                </option>
                <option value="balanced">Balanced (hybrid)</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">
                {strategyDescriptions[watch("strategy")]}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                {...register("includeAIExplanation")}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-xs text-slate-500">
                Generate coaching insight
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || generatePlan.isPending}
              className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300"
            >
              {generatePlan.isPending ? "Optimizing..." : "Generate AI Plan"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Current Plan
              </h2>
              <p className="text-sm text-slate-500">
                {plan
                  ? `Estimated payoff ${dayjs(plan.estimatedPayoffDate).format("MMM YYYY")} · Interest saved ${
                      plan.totalInterestPaid
                        ? formatCurrency(plan.totalInterestPaid)
                        : "Generate a plan"
                    }`
                  : "Generate a plan to see detailed projections."}
              </p>
            </div>
          </div>
          {plan ? (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl bg-primary-50 p-4 text-primary-800">
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Strategy · {plan.strategy.replace("-", " ").toUpperCase()}
                </p>
                <p className="mt-1 text-sm">
                  Stay consistent with the plan for{" "}
                  {Math.ceil(plan.entries.length / (debts?.length || 1))} months
                  to reach your debt-free date.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Month
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Debt
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Interest
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Remaining
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-sm">
                    {plan.entries.slice(0, 12).map((entry) => {
                      const debt = debts?.find((d) => d.id === entry.debtId);
                      return (
                        <tr key={entry.id}>
                          <td className="px-4 py-2 font-semibold text-slate-700">
                            {dayjs()
                              .year(entry.year)
                              .month(entry.month - 1)
                              .format("MMM YYYY")}
                          </td>
                          <td className="px-4 py-2 text-slate-600">
                            {debt?.name ?? "Debt"}
                          </td>
                          <td className="px-4 py-2 text-right font-medium text-slate-900">
                            {formatCurrency(entry.payment)}
                          </td>
                          <td className="px-4 py-2 text-right text-slate-500">
                            {formatCurrency(entry.interestPortion)}
                          </td>
                          <td className="px-4 py-2 text-right text-slate-500">
                            {formatCurrency(entry.remainingBalance)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
              Once your plan is generated, you'll see the month-by-month
              breakdown here including how much interest versus principal you'll
              tackle each cycle.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
