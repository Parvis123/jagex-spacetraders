import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardGrid from "./DashboardGrid";
import { TestWrapper } from "@/utils/test-utils/test-utils";

const mockProps = {
  credits: 150000,
  shipsCount: 3,
  contractsCount: 2,
  faction: "COSMIC",
};

describe("DashboardGrid", () => {
  it("renders all dashboard cards with correct values", () => {
    render(
      <TestWrapper>
        <DashboardGrid {...mockProps} />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText("Credits")).toBeInTheDocument();
    expect(screen.getByText("Ships")).toBeInTheDocument();
    expect(screen.getByText("Contracts")).toBeInTheDocument();
    expect(screen.getByText("Faction")).toBeInTheDocument();
    expect(screen.getByText("150,000")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Cosmic")).toBeInTheDocument();
  });

  it("formats numbers correctly", () => {
    render(
      <TestWrapper>
        <DashboardGrid {...mockProps} credits={1000000} />
      </TestWrapper>
    );

    expect(screen.getByText("1,000,000")).toBeInTheDocument();
  });

  it("applies grid layout classes", () => {
    // Act

    const { container } = render(
      <TestWrapper>
        <DashboardGrid {...mockProps} />
      </TestWrapper>
    );

    const gridElement = container.firstChild;

    // Assert

    expect(gridElement).toHaveClass(
      "grid",
      "gap-4",
      "md:grid-cols-2",
      "lg:grid-cols-4"
    );
  });
});
