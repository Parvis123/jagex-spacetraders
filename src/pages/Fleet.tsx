import { UseGame } from "@/contexts/GameContext";
import PageHeader from "@/components/custom/PageHeader";
import { Card } from "@/components/ui/card";
import { formatString } from "@/utils/utils";

const Fleet = () => {
  const { gameState } = UseGame();
  const { ships } = gameState;

  return (
    <div className="space-y-8">
      <PageHeader title="Your Fleet" description="Manage your ships" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ships.map((ship) => (
          <Card key={ship.symbol} className="p-4">
            <div className="space-y-2">
              <h3 className="font-bold">{ship.symbol}</h3>
              <div className="text-sm text-muted-foreground">
                <p>Type: {formatString(ship.registration.role)}</p>
                <p>Location: {ship.nav.waypointSymbol}</p>
                <p>Status: {formatString(ship.nav.status)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
