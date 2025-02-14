import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TestWrapper } from "@/utils/test-utils/test-utils";
import LoginForm from "./LoginForm";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("@/hooks/react-query-hooks/useGetAgent", () => ({
  useGetAgent: () => ({
    mutateAsync: vi.fn().mockResolvedValue({
      agent: {
        symbol: "TEST_AGENT",
        startingFaction: "COSMIC",
        credits: 150000,
        shipCount: 2,
      },
      ships: [],
      contracts: [],
    }),
    isPending: false,
  }),
}));

describe("LoginForm", () => {
  it("renders form elements correctly", () => {
    // Act
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    // Assert
    expect(
      screen.getByPlaceholderText(/enter your token/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /verify token/i })
    ).toBeInTheDocument();
  });

  it("shows error message for empty token submission", async () => {
    // Act
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole("button", { name: /verify token/i });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/token is required/i)).toBeInTheDocument();
    });
  });

  it("shows verification modal on successful token submission", async () => {
    // Act
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const tokenInput = screen.getByPlaceholderText(/enter your token/i);
    fireEvent.change(tokenInput, { target: { value: "test-token" } });

    const submitButton = screen.getByRole("button", { name: /verify token/i });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/verify agent details/i)).toBeInTheDocument();
      expect(screen.getByText("TEST_AGENT")).toBeInTheDocument();
    });
  });
});
