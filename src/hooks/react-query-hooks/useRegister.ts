import { useMutation } from "@tanstack/react-query";

interface RegisterData {
  symbol: string;
  faction: string;
}

interface ErrorResponse {
  error: {
    message: string;
    code: number;
    data?: {
      agentSymbol?: string;
    };
  };
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch("https://api.spacetraders.io/v2/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error.message);
      }

      return response.json();
    },
  });
}
