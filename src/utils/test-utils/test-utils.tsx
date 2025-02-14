import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const TestWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </GameProvider>
    </QueryClientProvider>
  );
};
