import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";
import type { RecurringExpense } from "../../../types/api";

export const useExpenses = () =>
  useQuery({
    queryKey: queryKeys.expenses,
    queryFn: async () => {
      const response = await apiClient.get<RecurringExpense[]>("/expenses");
      return response.data;
    },
  });

export type ExpensePayload = {
  name: string;
  category?: string | null;
  amount: number;
  frequency: string;
  dueDate: string;
  reminderDays?: number;
  autopay?: boolean;
  notes?: string | null;
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ExpensePayload) => {
      const response = await apiClient.post<RecurringExpense>("/expenses", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Expense added.");
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<ExpensePayload>;
    }) => {
      const response = await apiClient.put<RecurringExpense>(`/expenses/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Expense updated.");
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Expense removed.");
    },
  });
};

export const useMarkExpensePaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, paidAt }: { id: string; paidAt: string }) => {
      const response = await apiClient.post<RecurringExpense>(`/expenses/${id}/paid`, { paidAt });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Expense marked as paid.");
    },
  });
};
