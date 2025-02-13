import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseGame } from "@/contexts/GameContext";
import { formatString } from "@/utils/utils";

interface ShipCardProps {
  shipType: {
    type: string;
  };
  shipData?: {
    type: string;
    name: string;
    description: string;
    purchasePrice: number;
  };
  onPurchase: (type: string) => void;
  isPending: boolean;
  waypointSymbol: string;
}

const ShipCard = ({
  shipType,
  shipData,
  onPurchase,
  isPending,
  waypointSymbol,
}: ShipCardProps) => {
  const { gameState } = UseGame();
  const { ships } = gameState;

  // Check if any ship is at the current waypoint
  const hasShipInRange = ships.some(
    (ship) => ship.nav.waypointSymbol === waypointSymbol
  );

  return (
    <Card key={shipType.type} className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">
              {shipData
                ? formatString(shipData.name)
                : formatString(shipType.type)}
            </h3>
            {shipData && (
              <p className="text-sm text-muted-foreground">
                {shipData.description}
              </p>
            )}
          </div>
          <div className="text-right">
            {shipData ? (
              <p className="font-semibold">
                {shipData.purchasePrice.toLocaleString()} credits
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {hasShipInRange
                  ? "Loading..."
                  : "Move a ship here to see price"}
              </p>
            )}
            <Button
              onClick={() => onPurchase(shipType.type)}
              disabled={isPending || !shipData}
              className="mt-2"
            >
              {!hasShipInRange ? "No ship in range" : "Purchase"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ShipCard;
