import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestWrapper } from "@/utils/test-utils/test-utils";
import AgentRegisterForm from "./AgentRegisterForm";

const mockOpen = vi.fn();
window.open = mockOpen;

describe("AgentRegisterForm", () => {
  it("renders correctly", () => {
    // Act
    render(
      <TestWrapper>
        <AgentRegisterForm />
      </TestWrapper>
    );

    // Assert
    expect(
      screen.getByText(/Registration is handled through SpaceTraders.io/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Click below to create your account./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register at spacetraders.io/i })
    ).toBeInTheDocument();
  });

  it("opens registration link in new tab when button is clicked", () => {
    // Act
    render(
      <TestWrapper>
        <AgentRegisterForm />
      </TestWrapper>
    );

    const registerButton = screen.getByRole("button", {
      name: /register at spacetraders.io/i,
    });
    fireEvent.click(registerButton);

    // Assert
    expect(mockOpen).toHaveBeenCalledWith(
      "https://my.spacetraders.io/login",
      "_blank"
    );
  });
});
