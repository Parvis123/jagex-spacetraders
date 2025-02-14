import ContractCard from "./ContractCard";

interface ContractsListProps {
  contracts: Contract[];
  onAcceptContract: (contractId: string) => Promise<void>;
  isPending: boolean;
}

const ContractsList = ({
  contracts,
  onAcceptContract,
  isPending,
}: ContractsListProps) => {
  if (contracts.length === 0) {
    return <div className="text-center">No contracts available</div>;
  }

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <ContractCard
          key={contract.id}
          contract={contract}
          onAccept={onAcceptContract}
          isPending={isPending}
        />
      ))}
    </div>
  );
};

export default ContractsList;
