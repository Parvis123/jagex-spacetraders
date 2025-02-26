import {
  Rocket,
  Shield,
  Atom,
  Swords,
  Wrench,
  Skull,
  Compass,
  Eye,
  Handshake,
} from "lucide-react";

export const getFactionIcon = (factionSymbol: string) => {
  const Icon = {
    COSMIC: <Rocket size={18} />,
    GALACTIC: <Handshake size={18} />,
    QUANTUM: <Atom size={18} />,
    DOMINION: <Swords size={18} />,
    ASTRO: <Wrench size={18} />,
    CORSAIRS: <Skull size={18} />,
    VOID: <Compass size={18} />,
    OBSIDIAN: <Eye size={18} />,
    AEGIS: <Shield size={18} />,
  }[factionSymbol] || <Rocket size={18} />;

  return Icon;
};

export const formatString = (str: string): string => {
  if (!str) return "";

  const words = str.split(/[_\s]+/);

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");
};
