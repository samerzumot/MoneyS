import dayjs from "dayjs";
import clsx from "clsx";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateExpense,
  useDeleteExpense,
  useExpenses,
  useMarkExpensePaid,
} from "./api/useExpenses";
import type { ExpensePayload } from "./api/useExpenses";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import type { Frequency } from "../../types/api";

const expenseFormSchema = z.object({
  name: z.string().min(2),
  category: z.string().optional(),
  amount: z.number().min(0),
  frequency: z.string().min(1),
  dueDate: z.string().min(1),
  reminderDays: z.number().min(0).max(30),
  autopay: z.boolean().optional(),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: "WEEKLY", label: "Weekly" },
  { value: "BIWEEKLY", label: "Bi-weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "QUARTERLY", label: "Quarterly" },
  { value: "YEARLY", label: "Yearly" },
  { value: "CUSTOM", label: "Custom" },
];

export const ExpensesPage = () => {
  const { data: expenses, isLoading } = useExpenses();
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();
  const markPaid = useMarkExpensePaid();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      frequency: "MONTHLY",
      reminderDays: 3,
      autopay: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const payload: ExpensePayload = {
      name: values.name,
      category: values.category ?? null,
      amount: values.amount,
      frequency: values.frequency,
      dueDate: values.dueDate,
      reminderDays: values.reminderDays,
      autopay: values.autopay,
      notes: values.notes ?? null,
    };
    await createExpense.mutateAsync(payload);
    reset({
      frequency: "MONTHLY",
      reminderDays: 3,
      autopay: false,
    });
  });

  const totals = useMemo(
    () =>
      expenses?.reduce(
        (acc, expense) => {
          acc.monthly += expense.amount;
          return acc;
        },
        { monthly: 0 },
      ) ?? { monthly: 0 },
    [expenses],
  );

  if (isLoading || !expenses) {
    return <LoadingScreen message="Gathering recurring expenses..." />;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Track Recurring Expense
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add subscriptions, utilities, insurance premiums, and other
            recurring obligations so we can nudge you before they are due.
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
                placeholder="e.g. Netflix"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-danger">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </label>
              <input
                type="text"
                {...register("category")}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
                placeholder="Entertainment, Utilities..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("amount", { valueAsNumber: true })}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.amount ? "border-danger" : "border-slate-200",
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Frequency
                </label>
                <select
                  {...register("frequency")}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
                >
                  {frequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Next Due Date
                </label>
                <input
                  type="date"
                  {...register("dueDate")}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.dueDate ? "border-danger" : "border-slate-200",
                  )}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reminder (days before)
                </label>
                <input
                  type="number"
                  {...register("reminderDays", { valueAsNumber: true })}
                  className={clsx(
                    "mt-1 w-full rounded-2xl border bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white",
                    errors.reminderDays ? "border-danger" : "border-slate-200",
                  )}
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
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Notes
              </label>
              <textarea
                rows={3}
                {...register("notes")}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary-400 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || createExpense.isPending}
              className="w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300"
            >
              {createExpense.isPending ? "Saving..." : "Add Expense"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Upcoming Expenses
              </h2>
              <p className="text-sm text-slate-500">
                {expenses.length} recurring · {formatCurrency(totals.monthly)}{" "}
                per cycle
              </p>
            </div>
          </div>
          <div className="mt-6 divide-y divide-slate-200">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="grid gap-4 py-4 sm:grid-cols-5 sm:items-center"
              >
                <div className="sm:col-span-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {expense.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {expense.category ?? "Uncategorized"} ·{" "}
                    {expense.frequency.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Amount
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Next Due
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {dayjs(expense.dueDate).format("MMM D")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      markPaid.mutate({
                        id: expense.id,
                        paidAt: dayjs().toISOString(),
                      })
                    }
                    className="rounded-2xl border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600 transition hover:border-primary-300 hover:bg-primary-100"
                  >
                    Mark Paid
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteExpense.mutate(expense.id)}
                    className="rounded-2xl border border-danger/40 bg-danger/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-danger transition hover:bg-danger/20"
                  >
                    Delete
                  </button>
                </div>
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
