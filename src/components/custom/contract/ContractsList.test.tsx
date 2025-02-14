import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContractsList from "./ContractsList";
import { TestWrapper } from "@/utils/test-utils/test-utils";

// mock data
const mockContracts = [
  {
    id: "contract-1",
    type: "PROCUREMENT",
    factionSymbol: "COSMIC",
    terms: {
      deadline: "2024-12-31",
      payment: {
        onAccepted: 10000,
        onFulfilled: 50000,
      },
      deliver: [
        {
          tradeSymbol: "IRON_ORE",
          destinationSymbol: "X1-TEST",
          unitsFulfilled: 0,
          unitsRequired: 100,
        },
      ],
    },
    accepted: false,
    fulfilled: false,
    expiration: "2024-12-31",
    deadlineToAccept: "2024-12-31",
  },
];

const mockOnAcceptContract = vi.fn();

describe("ContractsList", () => {
  it("renders list of contracts", () => {
    // Act
    render(
      <TestWrapper>
        <ContractsList
          contracts={mockContracts}
          onAcceptContract={mockOnAcceptContract}
          isPending={false}
        />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText(/Procurement Contract/i)).toBeInTheDocument();
    expect(screen.getByText(/COSMIC/i)).toBeInTheDocument();
  });

  it("renders empty state when no contracts", () => {
    // Act
    render(
      <TestWrapper>
        <ContractsList
          contracts={[]}
          onAcceptContract={mockOnAcceptContract}
          isPending={false}
        />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText(/No contracts available/i)).toBeInTheDocument();
  });
});
