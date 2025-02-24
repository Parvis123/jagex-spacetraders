import { UseGame } from "@/contexts/GameContext";
import PageHeader from "@/components/custom/PageHeader";
import ShipFleetItem from "@/components/custom/fleet/ShipFleetItem";

const Fleet = () => {
  const { gameState } = UseGame();
  const { ships } = gameState;

  return (
    <div className="space-y-8 w-full max-w-none">
      <PageHeader title="Your Fleet" description="Manage your ships" />

      <div className="space-y-4 w-full">
        {ships.map((ship) => (
          <ShipFleetItem key={ship.symbol} ship={ship} />
        ))}
      </div>
    </div>
  );
};

export default Fleet;
