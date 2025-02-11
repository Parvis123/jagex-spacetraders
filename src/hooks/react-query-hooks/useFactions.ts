import { useQuery } from "@tanstack/react-query";

interface FactionsResponse {
  data: Faction[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

const fetchFactions = async (): Promise<Faction[]> => {
  const response = await fetch("https://api.spacetraders.io/v2/factions");
  const data: FactionsResponse = await response.json();
  return data.data.filter((faction) => faction.isRecruiting);
};

export function useFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: fetchFactions,
  });
}
