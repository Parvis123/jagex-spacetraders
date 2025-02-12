import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFactionIcon, formatString } from "@/utils/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ContractCardProps {
  contract: Contract;
  onAccept: (contractId: string) => Promise<void>;
  isPending: boolean;
}

const ContractCard = ({ contract, onAccept, isPending }: ContractCardProps) => {
  return (
    <Card>
      <Accordion type="single" collapsible>
        <AccordionItem value={contract.id}>
          <AccordionTrigger>
            <div className="flex w-full">
              <CardHeader className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="font-semibold">
                      {formatString(contract.type)} Contract
                    </h2>
                    <div className="flex items-center gap-2">
                      <div>{getFactionIcon(contract.factionSymbol)}</div>
                      <span className="text-sm">
                        {formatString(contract.factionSymbol)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">
                      Deadline:{" "}
                      {new Date(contract.terms.deadline).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-sm ${
                        contract.accepted ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      {contract.accepted ? "Accepted" : "Not Accepted"}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent>
              <div className="flex gap-16 pt-8">
                <div className="flex-1 space-y-4">
                  <h3 className="font-semibold text-lg">Payment Details</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Payment on accepting:{" "}
                      {contract.terms.payment.onAccepted.toLocaleString()}{" "}
                      credits
                    </p>
                    <p className="text-sm">
                      Payment on Completion:{" "}
                      {contract.terms.payment.onFulfilled.toLocaleString()}{" "}
                      credits
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-semibold text-lg">Delivery Terms</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Progress: {contract.terms.deliver[0].unitsFulfilled} /{" "}
                      {contract.terms.deliver[0].unitsRequired}{" "}
                      {formatString(contract.terms.deliver[0].tradeSymbol)}
                    </p>
                    <p className="text-sm">
                      Destination: {contract.terms.deliver[0].destinationSymbol}
                    </p>
                  </div>
                </div>
              </div>
              {!contract.accepted && (
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={() => onAccept(contract.id)}
                    disabled={isPending}
                  >
                    {isPending ? "Accepting..." : "Accept Contract"}
                  </Button>
                </div>
              )}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ContractCard;
