import { Badge } from "@/components/ui/badge";
import { getFactionIcon } from "@/utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FactionSelectProps {
  factions: Faction[];
  onValueChange: (value: string) => void;
  error?: string;
}

const FactionSelect = ({
  factions,
  onValueChange,
  error,
}: FactionSelectProps) => {
  return (
    <div className="space-y-2">
      <Select onValueChange={onValueChange} defaultValue="COSMIC">
        <SelectTrigger className="h-24 py-2">
          <SelectValue placeholder="Select faction" />
        </SelectTrigger>
        <SelectContent
          className="max-h-[300px] w-[var(--radix-select-trigger-width)] min-w-[400px]"
          position="popper"
          sideOffset={5}
        >
          {factions?.map((faction) => (
            <SelectItem
              key={faction.symbol}
              value={faction.symbol}
              className="py-3"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="text-muted-foreground">
                      {getFactionIcon(faction.symbol)}
                    </div>
                    <div className="font-medium">{faction.name}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {faction.traits.map((trait) => (
                      <Badge
                        key={trait.symbol}
                        variant="default"
                        className="text-xs"
                        title={trait.description}
                      >
                        {trait.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-normal">
                  {faction.description}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FactionSelect;
