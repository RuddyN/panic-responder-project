import { describe, expect, test } from "vitest";
import { AlertDetails } from "./AlertDetails";
import { screen, waitFor } from "@testing-library/react";
import fixture from "./../../mocks/fixture.json";
import renderInWrapper from "../../mocks/utils";

import type { PanicAlert } from "../../api/panic-alerts/types";

describe("AlertDetails", () => {
  const alertDetail = fixture.panicAlertDetails;

  test("Should show details for an alert", async () => {
    renderInWrapper(
      <AlertDetails panicAlert={fixture.panicAlertData[0] as PanicAlert} />
    );

    await waitFor(() => {
      expect(screen.getByText(alertDetail.userFullName)).toBeVisible();
    });
    expect(screen.getByText(alertDetail.alertCreatedAt)).toBeVisible();
    expect(screen.getByText(alertDetail.responderContact)).toBeVisible();
  });
});
