import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FactionsResponse {
  data: Faction[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

const fetchFactions = async (): Promise<Faction[]> => {
  const response = await axios.get<FactionsResponse>(
    "https://api.spacetraders.io/v2/factions"
  );
  return response.data.data.filter((faction) => faction.isRecruiting);
};

export function useFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: fetchFactions,
  });
}
