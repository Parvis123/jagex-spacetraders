import axios from "axios";

export const createApiClient = (token: string) => {
  const BASE_URL = "https://api.spacetraders.io/v2";

  const client = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    agent: {
      getMyAgent: () => client.get("/my/agent"),
      getMyShips: () => client.get("/my/ships"),
      getMyContracts: () => client.get("/my/contracts"),
    },
    shipyard: {
      getWaypoints: (systemSymbol: string) =>
        client.get(`/systems/${systemSymbol}/waypoints?traits=SHIPYARD`),
      getShipyard: (systemSymbol: string, waypointSymbol: string) =>
        client.get(
          `/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`
        ),
      purchaseShip: (shipType: string, waypointSymbol: string) =>
        client.post("/my/ships", { shipType, waypointSymbol }),
    },
    contracts: {
      accept: (contractId: string) =>
        client.post(`/my/contracts/${contractId}/accept`, {}),
    },
  };
};
