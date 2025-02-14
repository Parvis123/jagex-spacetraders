import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ShipCard from "./ShipCard";
import { TestWrapper } from "@/utils/test-utils/test-utils";

vi.mock("@/contexts/GameContext", () => ({
  UseGame: () => ({
    gameState: {
      ships: [
        {
          nav: {
            waypointSymbol: "TEST-WAYPOINT",
          },
        },
      ],
    },
  }),
  GameProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
describe("ShipCard", () => {
  const mockProps = {
    shipType: {
      type: "SHIP_TYPE",
    },
    shipData: {
      type: "SHIP_TYPE",
      name: "Test Ship",
      description: "A test ship",
      purchasePrice: 150000,
    },
    onPurchase: vi.fn(),
    isPending: false,
    waypointSymbol: "TEST-WAYPOINT",
  };

  it("renders ship details correctly", () => {
    // Act
    render(
      <TestWrapper>
        <ShipCard {...mockProps} />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText("Test Ship")).toBeInTheDocument();
    expect(screen.getByText("A test ship")).toBeInTheDocument();
    expect(screen.getByText("150,000 credits")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Purchase" })
    ).toBeInTheDocument();
  });

  it("calls onPurchase when purchase button is clicked", () => {
    // Act
    render(
      <TestWrapper>
        <ShipCard {...mockProps} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: "Purchase" }));

    // Assert
    expect(mockProps.onPurchase).toHaveBeenCalledWith("SHIP_TYPE");
  });

  it("disables purchase button when isPending is true", () => {
    // Act
    render(
      <TestWrapper>
        <ShipCard {...mockProps} isPending={true} />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByRole("button", { name: "Purchase" })).toBeDisabled();
  });

  it("shows loading message when shipData is not available", () => {
    // Act
    render(
      <TestWrapper>
        <ShipCard {...mockProps} shipData={undefined} />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
