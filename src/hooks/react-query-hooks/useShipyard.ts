import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UseGame } from "@/contexts/GameContext";

export function useWaypointsWithShipyard(systemSymbol: string, token: string) {
  return useQuery({
    queryKey: ["waypoints", systemSymbol],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?traits=SHIPYARD`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    },
  });
}

export function useShipyard(
  systemSymbol: string,
  waypointSymbol: string,
  token: string
) {
  return useQuery({
    queryKey: ["shipyard", waypointSymbol],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    },
    enabled: !!waypointSymbol,
  });
}

export function usePurchaseShip() {
  const { refreshGameState } = UseGame();

  return useMutation({
    mutationFn: async ({
      shipType,
      waypointSymbol,
      token,
    }: {
      shipType: string;
      waypointSymbol: string;
      token: string;
    }) => {
      const response = await axios.post(
        "https://api.spacetraders.io/v2/my/ships",
        {
          shipType,
          waypointSymbol,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await refreshGameState();
      return response.data;
    },
  });
}
