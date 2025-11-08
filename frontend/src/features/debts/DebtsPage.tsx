import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateDebt,
  useDebts,
  useDeleteDebt,
  useRecordDebtPayment,
} from "./api/useDebts";
import type { DebtPayload } from "./api/useDebts";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import type { DebtType } from "../../types/api";
import dayjs from "dayjs";
import clsx from "clsx";

const debtFormSchema = z.object({
  name: z.string().min(2),
  type: z.string(),
  balance: z.number().min(0),
  interestRate: z.number().min(0),
  minPayment: z.number().min(0),
  dueDate: z.string().optional(),
  autopay: z.boolean().optional(),
});

type DebtFormValues = z.infer<typeof debtFormSchema>;

const paymentFormSchema = z.object({
  amount: z.number().positive(),
  paymentDate: z.string().min(1),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const debtTypeOptions: { value: DebtType; label: string }[] = [
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "LOAN", label: "Loan" },
  { value: "MORTGAGE", label: "Mortgage" },
  { value: "STUDENT_LOAN", label: "Student Loan" },
  { value: "BNPL", label: "Buy Now Pay Later" },
  { value: "OTHER", label: "Other" },
];

export const DebtsPage = () => {
  const { data: debts, isLoading } = useDebts();
  const createDebt = useCreateDebt();
  const deleteDebt = useDeleteDebt();
  const recordPayment = useRecordDebtPayment();
  const [activeDebt, setActiveDebt] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DebtFormValues>({
    resolver: zodResolver(debtFormSchema),
    defaultValues: {
      type: "CREDIT_CARD",
      autopay: false,
    },
  });

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    reset: resetPayment,
    formState: { isSubmitting: isSubmittingPayment, errors: paymentErrors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentDate: dayjs().format("YYYY-MM-DD"),
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const payload: DebtPayload = {
      name: values.name,
      type: values.type,
      balance: values.balance,
      interestRate: values.interestRate,
      minPayment: values.minPayment,
      dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : null,
      autopay: values.autopay,
    };
    await createDebt.mutateAsync(payload);
    reset();
  });

  const onRecordPayment = handlePaymentSubmit(async (values) => {
    if (!activeDebt) return;
    await recordPayment.mutateAsync({
      id: activeDebt,
      amount: values.amount,
      paymentDate: dayjs(values.paymentDate).toISOString(),
    });
    resetPayment();
    setActiveDebt(null);
  });

  const totalBalances = useMemo(
    () => debts?.reduce((sum, debt) => sum + debt.balance, 0) ?? 0,
    [debts],
  );

  if (isLoading || !debts) {
    return <LoadingScreen message="Syncing debt accounts..." />;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Add Manual Debt
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            For liabilities that are not linked via Plaid you can add balances
            manually.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className={clsx(
                  "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                  errors.name ? "border-danger" : "border-slate-200",
                )}
                placeholder="e.g. Sapphire Preferred"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-danger">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </label>
              <select
                {...register("type")}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
              >
                {debtTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Balance
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("balance", { valueAsNumber: true })}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.balance ? "border-danger" : "border-slate-200",
                  )}
                />
                {errors.balance ? (
                  <p className="mt-1 text-xs text-danger">
                    {errors.balance.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("interestRate", { valueAsNumber: true })}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.interestRate ? "border-danger" : "border-slate-200",
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Min Payment
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("minPayment", { valueAsNumber: true })}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.minPayment ? "border-danger" : "border-slate-200",
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Due Date
                </label>
                <input
                  type="date"
                  {...register("dueDate")}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("autopay")}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-xs text-slate-500">Autopay enabled</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || createDebt.isPending}
              className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300"
            >
              {createDebt.isPending ? "Adding..." : "Add Debt"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Debt Portfolio
              </h2>
              <p className="text-sm text-slate-500">
                {debts.length} accounts · {formatCurrency(totalBalances)} total
                balance
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="rounded-3xl border border-slate-200 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                      {debt.type.replace("_", " ")}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {debt.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {debt.autopay ? "Autopay enabled" : "Manual payment"} ·
                      Minimum {formatCurrency(debt.minPayment)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-end gap-6 text-right">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Balance
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {formatCurrency(debt.balance)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Interest
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {debt.interestRate.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Due Date
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {debt.dueDate
                          ? dayjs(debt.dueDate).format("MMM D")
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDebt((current) =>
                        current === debt.id ? null : debt.id,
                      )
                    }
                    className="rounded-2xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600 transition hover:border-primary-300 hover:bg-primary-100"
                  >
                    Record Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDebt.mutate(debt.id)}
                    className="rounded-2xl border border-danger/40 bg-danger/10 px-4 py-2 text-sm font-semibold text-danger transition hover:bg-danger/20"
                  >
                    Remove
                  </button>
                </div>
                {activeDebt === debt.id ? (
                  <form
                    onSubmit={onRecordPayment}
                    className="mt-4 grid gap-3 rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          {...registerPayment("amount", {
                            valueAsNumber: true,
                          })}
                          className={clsx(
                            "mt-1 w-full rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:border-primary-400",
                            paymentErrors.amount
                              ? "border-danger"
                              : "border-slate-200",
                          )}
                        />
                        {paymentErrors.amount ? (
                          <p className="mt-1 text-xs text-danger">
                            {paymentErrors.amount.message}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Date
                        </label>
                        <input
                          type="date"
                          {...registerPayment("paymentDate")}
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-400"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={
                          isSubmittingPayment || recordPayment.isPending
                        }
                        className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300"
                      >
                        {recordPayment.isPending
                          ? "Recording..."
                          : "Save Payment"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          resetPayment();
                          setActiveDebt(null);
                        }}
                        className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
