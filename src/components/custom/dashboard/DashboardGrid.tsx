import { getFactionIcon, formatString } from "@/utils/utils";
import DashboardCard from "./DashboardCard";

interface DashboardGridProps {
  credits: number;
  shipsCount: number;
  contractsCount: number;
  faction: string;
}

const DashboardGrid = ({
  credits,
  shipsCount,
  contractsCount,
  faction,
}: DashboardGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard title="Credits">
        <p className="text-2xl font-bold">{credits.toLocaleString()}</p>
      </DashboardCard>

      <DashboardCard title="Ships">
        <p className="text-2xl font-bold">{shipsCount}</p>
      </DashboardCard>

      <DashboardCard title="Contracts">
        <p className="text-2xl font-bold">{contractsCount}</p>
      </DashboardCard>

      <DashboardCard title="Faction">
        <div className="flex items-center gap-2">
          {getFactionIcon(faction)}
          <span className="text-xl">{formatString(faction)}</span>
        </div>
      </DashboardCard>
    </div>
  );
};

export default DashboardGrid;
