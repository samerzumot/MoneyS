import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";
import type { Notification } from "../../../types/api";

export const useNotifications = () =>
  useQuery({
    queryKey: queryKeys.notifications,
    queryFn: async () => {
      const response = await apiClient.get<Notification[]>("/notifications");
      return response.data;
    },
  });

export const useDispatchNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/notifications/dispatch");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      toast.success("Notifications dispatched.");
    },
  });
};
