import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AgentVerifyModal from "./AgentVerifyModal";
import { TestWrapper } from "@/utils/test-utils/test-utils";

describe("AgentVerifyModal", () => {
  // Arrange
  const mockAgent = {
    symbol: "TEST_AGENT",
    startingFaction: "COSMIC",
    credits: 150000,
    shipCount: 2,
    accountId: "1",
    headquarters: "NARNIA",
  };

  const mockProps = {
    agent: mockAgent,
    isOpen: true,
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders agent details correctly", () => {
    // Act
    render(
      <TestWrapper>
        <AgentVerifyModal {...mockProps} />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText("TEST_AGENT")).toBeInTheDocument();
    expect(screen.getByText("COSMIC")).toBeInTheDocument();
    expect(screen.getByText("150,000")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onConfirm when Login button is clicked", () => {
    // Act
    render(
      <TestWrapper>
        <AgentVerifyModal {...mockProps} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it("calls onCancel when 'Wrong info' button is clicked", () => {
    // Act
    render(
      <TestWrapper>
        <AgentVerifyModal {...mockProps} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole("button", { name: /wrong info/i }));

    // Assert
    expect(mockProps.onCancel).toHaveBeenCalled();
  });

  it("doesn't render when isOpen is false", () => {
    // Act
    render(
      <TestWrapper>
        <AgentVerifyModal {...mockProps} isOpen={false} />
      </TestWrapper>
    );

    // Assert
    expect(screen.queryByText("Verify Agent Details")).not.toBeInTheDocument();
  });
});
