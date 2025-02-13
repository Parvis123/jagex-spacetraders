import { UseGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";
import {
  useWaypointsWithShipyard,
  useShipyard,
  usePurchaseShip,
} from "@/hooks/react-query-hooks/useShipyard";
import PageHeader from "@/components/custom/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { formatString } from "@/utils/utils";
import { AxiosError } from "axios";

const ShipCard = ({ shipType, shipData, onPurchase, isPending }) => (
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
              Move a ship here to see price
            </p>
          )}
          <Button
            onClick={() => onPurchase(shipType.type)}
            disabled={isPending || !shipData}
            className="mt-2"
          >
            {!shipData ? "No ship in range" : "Purchase"}
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const Shipyard = () => {
  const { gameState } = UseGame();
  const { ships } = gameState;
  const { toast } = useToast();
  const [selectedWaypoint, setSelectedWaypoint] = useState<string>("");

  const systemSymbol = ships[0]?.nav.systemSymbol;

  const { data: waypoints, isLoading } = useWaypointsWithShipyard(
    systemSymbol ?? "",
    gameState.token ?? ""
  );

  const { data: shipyard } = useShipyard(
    systemSymbol ?? "",
    selectedWaypoint,
    gameState.token ?? ""
  );

  const { mutateAsync: purchaseShip, isPending } = usePurchaseShip();

  const handlePurchaseShip = async (shipType: string) => {
    if (!selectedWaypoint) {
      toast({
        title: "Please select a waypoint",
        variant: "destructive",
      });
      return;
    }

    try {
      await purchaseShip({
        shipType,
        waypointSymbol: selectedWaypoint,
        token: gameState.token ?? "",
      });
      toast({
        title: "Ship purchased successfully",
        variant: "default",
      });
    } catch (error: unknown) {
      const errorData =
        error instanceof AxiosError ? error.response?.data?.error : null;

      const description = errorData?.data
        ? `Insufficient funds: ${errorData.data.creditsAvailable.toLocaleString()} / ${errorData.data.creditsNeeded.toLocaleString()} credits needed`
        : errorData?.message ?? "An error occurred";

      toast({
        title: "Failed to purchase ship",
        description,
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!waypoints?.length) {
    return (
      <div>
        <PageHeader title="Shipyard" description="Purchase new ships" />
        <p className="text-muted-foreground">
          No shipyards available in the current system.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Shipyard" description="Purchase new ships" />
      <div className="space-y-4">
        <Select onValueChange={setSelectedWaypoint}>
          <SelectTrigger>
            <SelectValue placeholder="Select a shipyard" />
          </SelectTrigger>
          <SelectContent>
            {waypoints.map((waypoint) => (
              <SelectItem key={waypoint.symbol} value={waypoint.symbol}>
                {waypoint.symbol}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {shipyard && (
          <div className="grid gap-4">
            {shipyard.shipTypes.map((shipType) => {
              const shipData = shipyard.ships?.find(
                (ship) => ship.type === shipType.type
              );
              return (
                <ShipCard
                  key={shipType.type}
                  shipType={shipType}
                  shipData={shipData}
                  onPurchase={handlePurchaseShip}
                  isPending={isPending}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipyard;
