import LoadingScreen from "@/components/custom/LoadingScreen";
import PageHeader from "@/components/custom/PageHeader";
import ShipRegisterForm from "@/components/custom/ShipRegisterForm";
import { useFactions } from "@/hooks/react-query-hooks/useFactions";

const NewGame = () => {
  const { data: factions, isLoading, error } = useFactions();

  if (isLoading) {
    return <LoadingScreen />;
  }

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
          title="New Game"
          description="Register your spaceship's name & faction"
        />
        <ShipRegisterForm factions={factions ?? []} />
      </div>
    </main>
  );
};

export default NewGame;
