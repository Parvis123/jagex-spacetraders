import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UseGame } from "@/contexts/GameContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useGetAgent } from "@/hooks/react-query-hooks/useGetAgent";
import AgentVerifyModal from "./AgentVerifyModal";
import * as z from "zod";

const loginFormSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { setGameState } = UseGame();
  const navigate = useNavigate();
  const { mutateAsync: getAgent, isPending } = useGetAgent();

  const [verifyAgent, setVerifyAgent] = useState<Agent | null>(null);
  const [agentToken, setAgentToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const { token } = data;
    try {
      const { agent, ships, contracts } = await getAgent(token);
      setAgentToken(token);
      setVerifyAgent(agent);
      setGameState({
        agent,
        ships,
        contracts,
        token,
      });
    } catch (error) {
      setError("token", {
        type: "manual",
        message: "Invalid token. Please check and try again.",
      });
    }
  };

  const handleConfirm = () => {
    if (!verifyAgent || !agentToken) return;
    localStorage.setItem("spaceTraders_token", agentToken);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    setVerifyAgent(null);
    setAgentToken(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your token"
            className="min-h-[148px] resize-none"
            {...register("token")}
          />
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            "Verify Token"
          )}
        </Button>
        {errors.token && (
          <p className="text-sm text-red-500">{errors.token.message}</p>
        )}
      </form>

      {verifyAgent && (
        <AgentVerifyModal
          agent={verifyAgent}
          isOpen={!!verifyAgent}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default LoginForm;
