import { createApiClient } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useGetAgent() {
  return useMutation({
    mutationFn: async (token: string) => {
      const api = createApiClient(token);
      const [
        {
          data: { data: agent },
        },
        {
          data: { data: ships },
        },
        {
          data: { data: contracts },
        },
      ] = await Promise.all([
        api.agent.getMyAgent(),
        api.agent.getMyShips(),
        api.agent.getMyContracts(),
      ]);

      return { agent, ships, contracts };
    },
  });
}
