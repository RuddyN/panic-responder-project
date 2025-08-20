import { screen, waitFor } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import App from "./App";
import renderInWrapper from "./mocks/utils";

describe("Panic Alert App", () => {
  it("renders a page with stats", async () => {
    renderInWrapper(<App />);

    expect(screen.getByText("Panic Alert System")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("total-alerts")).toHaveTextContent("2");
    });
  });

  it.todo("find a way to test the map being clicked");
});
