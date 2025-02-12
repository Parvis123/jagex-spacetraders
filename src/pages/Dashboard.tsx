import PageHeader from "@/components/custom/PageHeader";
import { UseGame } from "@/contexts/GameContext";

const Dashboard = () => {
  const { gameState } = UseGame();
  const { ships, contracts } = gameState;
  const { credits, symbol } = gameState.agent || { credits: 0, symbol: "" };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${symbol}`}
        description="Your space trading command center"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
};

export default Dashboard;
