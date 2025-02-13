import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const AgentRegisterForm = () => {
  const handleClick = () => {
    window.open("https://my.spacetraders.io/login", "_blank");
  };

  return (
    <div className="min-h-[150px] flex flex-col">
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <p className="text-muted-foreground text-sm pb-11">
          Registration is handled through SpaceTraders.io <br />
          Click below to create your account.
        </p>

        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={handleClick}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Register at SpaceTraders.io
        </Button>
      </div>
    </div>
  );
};

export default AgentRegisterForm;
