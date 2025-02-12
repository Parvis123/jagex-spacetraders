import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AgentVerifyModalProps {
  agent: Agent;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AgentVerifyModal = ({
  agent,
  isOpen,
  onConfirm,
  onCancel,
}: AgentVerifyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Agent Details</DialogTitle>
          <DialogDescription>
            Please verify if this is the correct agent you want to login as.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Agent Name:</span>
            <span>{agent.symbol}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Faction:</span>
            <span>{agent.startingFaction}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Credits:</span>
            <span>{agent.credits.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Ships:</span>
            <span>{agent.shipCount}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Wrong info, not me
          </Button>
          <Button onClick={onConfirm}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgentVerifyModal;
