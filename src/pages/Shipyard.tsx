import { UseGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";
import {
  useWaypointsWithShipyard,
  useShipyard,
  usePurchaseShip,
} from "@/hooks/react-query-hooks/useShipyard";
import PageHeader from "@/components/custom/PageHeader";
import { useState } from "react";
import { AxiosError } from "axios";
import ShipCard from "@/components/custom/shipyard/ShipCard";
import WaypointSelector from "@/components/custom/WaypointSelector";

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
    <div className="space-y-8">
      <PageHeader title="Shipyard" description="Purchase new ships" />

      <WaypointSelector
        waypoints={waypoints}
        selectedWaypoint={selectedWaypoint}
        onWaypointSelect={setSelectedWaypoint}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!selectedWaypoint ? (
          <p className="text-muted-foreground">
            Select a shipyard to view available ships
          </p>
        ) : !shipyard ? (
          <p className="text-muted-foreground">Loading shipyard data...</p>
        ) : (
          shipyard.shipTypes.map((shipType: ShipyardShip) => (
            <ShipCard
              key={shipType.type}
              shipType={shipType}
              shipData={shipyard.ships.find(
                (ship: ShipyardShip) => ship.type === shipType.type
              )}
              onPurchase={handlePurchaseShip}
              isPending={isPending}
              waypointSymbol={selectedWaypoint}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Shipyard;
