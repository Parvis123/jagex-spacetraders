import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardCard from "./DashboardCard";
import { TestWrapper } from "@/utils/test-utils/test-utils";

describe("DashboardCard", () => {
  it("renders title correctly", () => {
    // Arrange
    const title = "Test Title";

    // Act
    render(
      <TestWrapper>
        <DashboardCard title={title}>
          <p>Test content</p>
        </DashboardCard>
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders children content", () => {
    // Arrange
    const childContent = "Test child content";

    // Act
    render(
      <TestWrapper>
        <DashboardCard title="Test">
          <p>{childContent}</p>
        </DashboardCard>
      </TestWrapper>
    );

    // Assert
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });
});
