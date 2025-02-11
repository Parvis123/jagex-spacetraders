interface Trait {
  symbol: string;
  name: string;
  description: string;
}

interface Faction {
  symbol: string;
  name: string;
  description: string;
  headquarters: string;
  traits: Trait[];
  isRecruiting: boolean;
}
