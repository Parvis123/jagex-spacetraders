import { useQuery, useMutation } from "@tanstack/react-query";
import { UseGame } from "@/contexts/GameContext";
import { createApiClient } from "@/lib/api-client";

export const useWaypointsWithShipyard = (
  systemSymbol: string,
  token: string
) => {
  const api = createApiClient(token);

  return useQuery({
    queryKey: ["waypoints", systemSymbol],
    queryFn: async () => {
      const {
        data: { data },
      } = await api.shipyard.getWaypoints(systemSymbol);
      return data;
    },
  });
};

export const useShipyard = (
  systemSymbol: string,
  waypointSymbol: string,
  token: string
) => {
  const api = createApiClient(token);

  return useQuery({
    queryKey: ["shipyard", waypointSymbol],
    queryFn: async () => {
      const {
        data: { data },
      } = await api.shipyard.getShipyard(systemSymbol, waypointSymbol);

      return {
        ...data,
        ships:
          data.ships ||
          data.shipTypes.map((type: { type: string }) => ({
            type: type.type,
            name: type.type,
            description:
              "Ship details are only available when a ship is in range",
            purchasePrice: "???",
          })),
      };
    },
    enabled: !!waypointSymbol,
  });
};

export const usePurchaseShip = () => {
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
      const api = createApiClient(token);
      const { data } = await api.shipyard.purchaseShip(
        shipType,
        waypointSymbol
      );
      await refreshGameState();
      return data;
    },
  });
};
