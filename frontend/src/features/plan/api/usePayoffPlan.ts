import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";
import type { PayoffPlan } from "../../../types/api";

export const useLatestPayoffPlan = () =>
  useQuery({
    queryKey: queryKeys.plan.latest,
    queryFn: async () => {
      const response = await apiClient.get<PayoffPlan | null>("/plan/latest");
      return response.data;
    },
  });

type GeneratePlanPayload = {
  monthlyBudget: number;
  strategy?: "avalanche" | "snowball" | "balanced";
  emergencyBuffer?: number;
  includeAIExplanation?: boolean;
};

type GeneratePlanResponse = {
  strategy: string;
  monthlyBudget: number;
  totalInterestPaid: number;
  estimatedPayoffDate: string;
  monthsToPayoff: number;
  schedule: {
    debtId: string;
    month: number;
    year: number;
    payment: number;
    interestPortion: number;
    principalPortion: number;
    remainingBalance: number;
  }[];
  aiInsights: string | null;
};

export const useGeneratePayoffPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: GeneratePlanPayload) => {
      const response = await apiClient.post<GeneratePlanResponse>("/plan/generate", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plan.latest });
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("New payoff plan generated.");
    },
  });
};
