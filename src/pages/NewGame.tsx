import LoadingScreen from "@/components/custom/LoadingScreen";
import PageHeader from "@/components/custom/PageHeader";
import AgentRegisterForm from "@/components/custom/registerForm/AgentRegisterForm";
import LoginForm from "@/components/custom/loginForm/LoginForm";
import { useFactions } from "@/hooks/react-query-hooks/useFactions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NewGame = () => {
  const { isLoading, error } = useFactions();
  const [mode, setMode] = useState<"register" | "login">("register");

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load factions
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-foreground">
      <div className="space-y-8 text-center w-full max-w-2xl px-4">
        <PageHeader
          title="Space Traders"
          description={
            mode === "register"
              ? "Create your account at SpaceTraders.io"
              : "Welcome back, space cowboy"
          }
        />

        <div className="flex gap-2 justify-center">
          <Button
            variant={mode === "register" ? "default" : "outline"}
            onClick={() => setMode("register")}
          >
            Register
          </Button>
          <Button
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
          >
            Login
          </Button>
        </div>

        {mode === "register" ? <AgentRegisterForm /> : <LoginForm />}
      </div>
    </main>
  );
};

export default NewGame;
