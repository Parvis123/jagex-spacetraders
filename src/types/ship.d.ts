interface ShipRequirements {
  power?: number;
  crew?: number;
  slots?: number;
}

interface ShipModule {
  symbol: string;
  name: string;
  description: string;
  capacity?: number;
  requirements: ShipRequirements;
}

interface ShipMount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits?: string[];
  requirements: ShipRequirements;
}

interface ShipFrame {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  integrity: number;
  requirements: ShipRequirements;
}

interface ShipReactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: ShipRequirements;
}

interface ShipEngine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: ShipRequirements;
}

interface ShipCrew {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface ShipFuel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
}

interface ShipCooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
}

interface ShipCargo {
  capacity: number;
  units: number;
  inventory: Array<{
    symbol: string;
    units: number;
  }>;
}
interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: {
    origin: WaypointLocation;
    destination: WaypointLocation;
    arrival: string;
    departureTime: string;
  };
  status: "IN_TRANSIT" | "IN_ORBIT" | "DOCKED";
  flightMode: "DRIFT" | "STEALTH" | "CRUISE" | "BURN";
}

interface Ship {
  symbol: string;
  registration: {
    name: string;
    factionSymbol: string;
    role: string;
  };
  nav: ShipNav;
  crew: ShipCrew;
  fuel: ShipFuel;
  cooldown: ShipCooldown;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: ShipCargo;
}
