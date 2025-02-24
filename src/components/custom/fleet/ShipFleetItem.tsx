import { formatString } from "@/utils/utils";

interface ShipFleetItemProps {
  ship: Ship;
}

const ShipFleetItem = ({ ship }: ShipFleetItemProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-zinc-700/80 p-6 shadow-sm transition-shadow hover:shadow-md w-full">
      <div className="space-y-4 w-full">
        {/* header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{ship.symbol}</h3>
          <span
            className={`text-sm ${
              ship.nav.status === "IN_TRANSIT"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {formatString(ship.nav.status)}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* ship details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Ship Details</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-primary">Role</span>
                <span className="text-sm">
                  {formatString(ship.registration.role)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">Frame</span>
                <span className="text-sm">{formatString(ship.frame.name)}</span>
              </div>
            </div>
          </div>

          {/* navigation */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Navigation</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-primary">System</span>
                <span className="text-sm">{ship.nav.systemSymbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">Location</span>
                <span className="text-sm">{ship.nav.waypointSymbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">Flight Mode</span>
                <span className="text-sm">
                  {formatString(ship.nav.flightMode)}
                </span>
              </div>
            </div>
          </div>

          {/* cargo */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary">Cargo</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-primary">Capacity</span>
                <span className="text-sm">
                  {ship.cargo.units} / {ship.cargo.capacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-primary">Items</span>
                <span className="text-sm">{ship.cargo.inventory.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipFleetItem;
