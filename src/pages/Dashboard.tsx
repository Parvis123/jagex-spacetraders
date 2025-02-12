import DashboardGrid from "@/components/custom/dashboard/DashboardGrid";
import PageHeader from "@/components/custom/PageHeader";
import { UseGame } from "@/contexts/GameContext";
import { formatString } from "@/utils/utils";

const Dashboard = () => {
  const { gameState } = UseGame();
  const { ships, contracts } = gameState;
  const { credits, symbol, startingFaction } = gameState.agent || {
    credits: 0,
    symbol: "",
    startingFaction: "",
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${formatString(symbol)}`}
        description="Your space trading command center"
      />
      <DashboardGrid
        credits={credits}
        shipsCount={ships.length}
        contractsCount={contracts.length}
        faction={startingFaction}
      />
    </div>
  );
};

export default Dashboard;
