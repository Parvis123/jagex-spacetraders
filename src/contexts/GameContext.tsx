import { useGetAgent } from "@/hooks/react-query-hooks/useGetAgent";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface GameState {
  agent: Agent | null;
  ships: Ship[];
  contracts: Contract[];
  token: string | null;
}

interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
  refreshGameState: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem("spaceTraders_gameState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      agent: null,
      ships: [],
      contracts: [],
      token: localStorage.getItem("spaceTraders_token"),
    };
  });

  const { mutateAsync: getAgent } = useGetAgent();

  // Update localStorage whenever gameState changes
  useEffect(() => {
    localStorage.setItem("spaceTraders_gameState", JSON.stringify(gameState));
  }, [gameState]);

  const resetGame = () => {
    setGameState({
      agent: null,
      ships: [],
      contracts: [],
      token: null,
    });
    localStorage.removeItem("spaceTraders_token");
    localStorage.removeItem("spaceTraders_gameState");
  };

  const refreshGameState = async () => {
    if (!gameState.token) return;
    try {
      const { agent, ships, contracts } = await getAgent(gameState.token);
      setGameState({
        ...gameState,
        agent,
        ships,
        contracts,
      });
    } catch (error) {
      console.error("Failed to refresh game state:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{ gameState, setGameState, resetGame, refreshGameState }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function UseGame() {
  const context = useContext(GameContext);
  if (undefined === context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
