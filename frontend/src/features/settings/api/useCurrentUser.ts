import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import { queryKeys } from "../../../lib/queryKeys";
import type { CurrentUserResponse } from "../../../types/api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const response = await apiClient.get<CurrentUserResponse>("/user/me");
      return response.data;
    },
  });
