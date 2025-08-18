import { render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Panic Alert App", () => {
  it("renders a greeting", async () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );
    expect(true).toBeTruthy();
    expect(screen.getByText("Panic Alert System")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("total-alerts")).toHaveTextContent("2");
    });
  });
});
