import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";
import type { DebtAccount } from "../../../types/api";

export const useDebts = () =>
  useQuery({
    queryKey: queryKeys.debts,
    queryFn: async () => {
      const response = await apiClient.get<DebtAccount[]>("/debts");
      return response.data;
    },
  });

export type DebtPayload = {
  name: string;
  type: string;
  balance: number;
  interestRate: number;
  minPayment: number;
  dueDate?: string | null;
  autopay?: boolean;
};

export const useCreateDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DebtPayload) => {
      const response = await apiClient.post<DebtAccount>("/debts", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Debt added.");
    },
  });
};

export const useUpdateDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<DebtPayload> }) => {
      const response = await apiClient.put<DebtAccount>(`/debts/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Debt updated.");
    },
  });
};

export const useDeleteDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/debts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Debt removed.");
    },
  });
};

export const useRecordDebtPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      amount,
      paymentDate,
    }: {
      id: string;
      amount: number;
      paymentDate: string;
    }) => {
      await apiClient.post(`/debts/${id}/payments`, { amount, paymentDate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Payment recorded.");
    },
  });
};
