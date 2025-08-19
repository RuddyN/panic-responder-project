import { describe, expect, test } from "vitest";
import { AlertDetails } from "./AlertDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import fixture from './../../mocks/fixture.json'
import type { PanicAlert } from "../../api/panic-alerts/types";

//TODO extract to helper
const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("AlertDetails", () => {
  const alertDetail = fixture.panicAlertDetails;

  test("Should show details for an alert", async () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <AlertDetails panicAlert={fixture.panicAlertData[0] as PanicAlert} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(alertDetail.alertLocation)).toBeVisible();
    });
    expect(screen.getByText(alertDetail.fullName)).toBeVisible();
    expect(screen.getByText(alertDetail.responderContact)).toBeVisible();
  });
});
