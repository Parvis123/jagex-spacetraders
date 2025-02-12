import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UseGame } from "@/contexts/GameContext";

export function useAcceptContract() {
  const { refreshGameState } = UseGame();

  return useMutation({
    mutationFn: async ({
      contractId,
      token,
    }: {
      contractId: string;
      token: string;
    }) => {
      const response = await axios.post(
        `https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await refreshGameState();
      return response.data;
    },
  });
}
