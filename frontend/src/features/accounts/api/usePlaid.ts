import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";

type LinkTokenResponse = {
  link_token: string;
};

export const fetchPlaidLinkToken = async (): Promise<LinkTokenResponse> => {
  const response = await apiClient.post<LinkTokenResponse>("/plaid/link-token");
  return response.data;
};

export const useExchangePlaidToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (publicToken: string) => {
      await apiClient.post("/plaid/exchange", { publicToken });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Accounts connected via Plaid.");
    },
  });
};

export const useSyncPlaidLiabilities = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/plaid/sync");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.debts });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success("Plaid accounts synced.");
    },
  });
};
