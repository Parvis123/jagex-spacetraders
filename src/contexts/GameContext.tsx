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

  return (
    <GameContext.Provider value={{ gameState, setGameState, resetGame }}>
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
