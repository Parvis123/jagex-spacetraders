import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-foreground">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-secondary">
          Space Traders
        </h1>
        <p className="text-zinc-200">
          Launch your first ship, <br /> Begin building your tycoon
        </p>
        <Button variant="secondary" size="lg">
          Start Trading
        </Button>
      </div>
    </main>
  );
};

export default Home;
