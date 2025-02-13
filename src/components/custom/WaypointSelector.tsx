import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WaypointSelectorProps {
  waypoints: WaypointLocation[];
  selectedWaypoint: string;
  onWaypointSelect: (value: string) => void;
}

const WaypointSelector = ({
  waypoints,
  selectedWaypoint,
  onWaypointSelect,
}: WaypointSelectorProps) => (
  <Select value={selectedWaypoint} onValueChange={onWaypointSelect}>
    <SelectTrigger className="w-[280px]">
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
);

export default WaypointSelector;
