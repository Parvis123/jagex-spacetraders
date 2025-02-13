import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const AgentRegisterForm = () => {
  return (
    <div className="space-y-6 min-h-[148px] flex flex-col justify-center">
      <p className="text-muted-foreground text-sm">
        Registration is handled through SpaceTraders.io <br />
        Click below to create your account.
      </p>

      <Button
        variant="default"
        size="lg"
        className="w-full"
        onClick={() =>
          window.open("https://my.spacetraders.io/login", "_blank")
        }
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Register at SpaceTraders.io
      </Button>
    </div>
  );
};

export default AgentRegisterForm;
