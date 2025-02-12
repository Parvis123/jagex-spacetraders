import PageHeader from "@/components/custom/PageHeader";
import { UseGame } from "@/contexts/GameContext";
import { getFactionIcon } from "@/utils/utils";

const Dashboard = () => {
  const { gameState } = UseGame();
  const { ships, contracts } = gameState;
  const { credits, symbol, headquarters, startingFaction } =
    gameState.agent || {
      credits: 0,
      symbol: "",
      headquarters: "",
      startingFaction: "",
    };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${symbol}`}
        description="Your space trading command center"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold">Credits</h3>
          <p className="text-2xl font-bold">{credits.toLocaleString()}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold">Ships</h3>
          <p className="text-2xl font-bold">{ships.length}</p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold">Contracts</h3>
          <p className="text-2xl font-bold">{contracts.length}</p>
        </div>

        <div className="rounded-lg border bg-card p-4 flex flex-col">
          <h3 className="font-semibold">Faction</h3>
          <div className="flex items-center gap-2 mt-1">
            {getFactionIcon(startingFaction)}
            <span className="text-xl">{startingFaction}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-2">Active Ships</h3>
          {ships.length > 0 ? (
            <div className="space-y-2">
              {ships.map((ship) => (
                <div
                  key={ship.symbol}
                  className="flex justify-between items-center p-2 bg-muted rounded"
                >
                  <span>{ship.registration.name}</span>
                  <span className="text-muted-foreground">
                    {ship.nav.status.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No ships available</p>
          )}
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold mb-2">Headquarters</h3>
          <p className="text-xl">{headquarters}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
