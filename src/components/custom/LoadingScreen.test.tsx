import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";
import { TestWrapper } from "@/utils/test-utils/test-utils";

describe("LoadingScreen", () => {
  it("renders spinner", () => {
    // Act
    render(
      <TestWrapper>
        <LoadingScreen />
      </TestWrapper>
    );

    // Assert
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
