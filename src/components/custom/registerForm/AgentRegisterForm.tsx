import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, MoveRight, Copy } from "lucide-react";
import { useRegister } from "@/hooks/react-query-hooks/useRegister";
import FactionSelect from "./FactionSelect";
import { useState } from "react";
import { UseGame } from "@/contexts/GameContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  symbol: z
    .string()
    .min(3, "Agent name must contain at least 3 characters")
    .max(14, "Agent name must contain at most 14 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Agent name can only contain letters and numbers"),
  faction: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  factions: Faction[];
}

const AgentRegisterForm = ({ factions }: RegisterFormProps) => {
  const register = useRegister();
  const { setGameState } = UseGame();
  const navigate = useNavigate();

  const [apiToken, setApiToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      faction: "COSMIC",
    },
  });

  const { isPending } = register;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await register.mutateAsync(data);
      const { agent, ship, contract, token } = response.data;

      // Save token to localStorage
      localStorage.setItem("spaceTraders_token", token);

      // Set token for display
      setApiToken(token);

      setGameState({
        agent,
        ships: [ship],
        contracts: contract ? [contract] : [],
        token: token,
      });

      setIsRegistered(true);
    } catch (error) {
      if (error instanceof Error) {
        setError("symbol", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiToken || "");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Agent name"
            {...registerField("symbol")}
            disabled={isRegistered}
          />
          {errors.symbol && (
            <p className="text-sm text-red-500">{errors.symbol.message}</p>
          )}
        </div>

        <FactionSelect
          disabled={isRegistered}
          factions={factions}
          onValueChange={(value) => setValue("faction", value)}
          error={errors.faction?.message}
        />

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={isPending || isRegistered}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : !isRegistered ? (
            "Register"
          ) : (
            <>
              Successfully registered
              <Check className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {apiToken && (
        <div className="mt-4 p-4 bg-gray-600 rounded-md">
          <div className="relative flex items-center justify-center">
            <p className="text-sm font-medium text-primary">
              Your API Token (save this somewhere safe!):
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 h-8"
              onClick={copyToClipboard}
            >
              {hasCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <code className="block mt-2 p-2 bg-black rounded border overflow-x-auto whitespace-nowrap text-sm">
            {apiToken}
          </code>
        </div>
      )}

      {isRegistered && (
        <Button
          variant="default"
          size="lg"
          className="w-full mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
          <MoveRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default AgentRegisterForm;
