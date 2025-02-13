import { UseGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";
import { useAcceptContract } from "@/hooks/react-query-hooks/useContracts";
import PageHeader from "@/components/custom/PageHeader";
import ContractsList from "@/components/custom/contract/ContractsList";

const Contracts = () => {
  const { gameState } = UseGame();
  const { toast } = useToast();
  const { contracts } = gameState;

  const { mutateAsync: acceptContract, isPending } = useAcceptContract();

  const handleAcceptContract = async (contractId: string) => {
    try {
      await acceptContract({ contractId, token: gameState.token ?? "" });
      toast({
        title: "Contract accepted successfully",
        description:
          "Credits deposited into your account, finish the job for full payment",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to accept contract",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <PageHeader
        title="Your Contracts"
        description="View and manage your active contracts"
      />

      <div className="space-y-8 w-full min-w-[200%] mx-auto">
        <ContractsList
          contracts={contracts}
          onAcceptContract={handleAcceptContract}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default Contracts;
