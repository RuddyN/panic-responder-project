import { screen, waitFor } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import App from "./App";
import renderInWrapper from "./mocks/utils";

describe("Panic Alert App", () => {
  it("renders a page with stats", async () => {
    renderInWrapper(<App />);

    expect(screen.getByText("Panic Alert System")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("new-alerts")).toHaveTextContent("2");
    });
    expect(screen.getByTestId("resolved-alerts")).toHaveTextContent("5");
  });

  it("Should load responder markers to the ap", async () => {
    renderInWrapper(<App />);

    const markerParent = screen.getByTestId("marker-foo-1");

    await waitFor(() => {
      expect(markerParent).toBeInTheDocument();
    });
  });
});
