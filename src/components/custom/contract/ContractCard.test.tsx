import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContractCard from "@/components/custom/contract/ContractCard";
import { TestWrapper } from "@/utils/test-utils/test-utils";

// mock data
const mockContract = {
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
};

const mockAccept = vi.fn();

const mockProps = {
  contract: mockContract,
  onAccept: mockAccept,
  isPending: false,
};

describe("ContractCard", () => {
  it("renders contract details correctly", () => {
    // Act
    render(
      <TestWrapper>
        <ContractCard {...mockProps} />
      </TestWrapper>
    );

    const accordionTrigger = screen.getByRole("button", {
      name: /procurement contract/i,
    });
    fireEvent.click(accordionTrigger);

    // Assert
    expect(screen.getByText(/Procurement Contract/i)).toBeInTheDocument();
    expect(screen.getByText(/Iron Ore/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Payment on Completion: 50,000 credits/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Not Accepted/i)).toBeInTheDocument();
  });

  it("calls onAcceptContract when accept button is clicked", () => {
    // Act
    render(
      <TestWrapper>
        <ContractCard {...mockProps} />
      </TestWrapper>
    );

    const accordionTrigger = screen.getByRole("button", {
      name: /procurement contract/i,
    });
    fireEvent.click(accordionTrigger);

    const acceptButton = screen.getByRole("button", {
      name: /accept contract/i,
    });
    fireEvent.click(acceptButton);

    // Assert
    expect(mockAccept).toHaveBeenCalledWith(mockContract.id);
  });

  it("disables accept button when isPending is true", () => {
    // Act
    render(
      <TestWrapper>
        <ContractCard
          contract={mockContract}
          onAccept={mockAccept}
          isPending={true}
        />
      </TestWrapper>
    );

    const accordionTrigger = screen.getByRole("button", {
      name: /procurement contract/i,
    });
    fireEvent.click(accordionTrigger);

    // Assert
    expect(screen.getByRole("button", { name: /accepting/i })).toBeDisabled();
  });
});
