import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      try {
        const response = await axios.post(
          "https://api.spacetraders.io/v2/register",
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data as ErrorResponse;
          throw new Error(errorData.error.message);
        }
        throw error;
      }
    },
  });
}
