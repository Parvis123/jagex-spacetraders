import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetAgent() {
  return useMutation({
    mutationFn: async (token: string) => {
      const [agentResponse, shipsResponse, contractsResponse] =
        await Promise.all([
          axios.get("https://api.spacetraders.io/v2/my/agent", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://api.spacetraders.io/v2/my/ships", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://api.spacetraders.io/v2/my/contracts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      return {
        agent: agentResponse.data.data,
        ships: shipsResponse.data.data,
        contracts: contractsResponse.data.data,
      };
    },
  });
}
