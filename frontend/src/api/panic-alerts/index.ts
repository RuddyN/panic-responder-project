import { ApiError } from "../api-error";
import type { PanicAlertDetails, PanicAlert } from "./types";

const BASEURL = "http://localhost:3000";

export const getPanicAlerts = async () => {
  const response = await fetch(`${BASEURL}/panic-alerts`);

  if (!response.ok) {
    const body = await response.json();
    throw new ApiError({
      statusCode: response.status,
      message: body?.error.message,
    });
  }

  return response.json() as Promise<PanicAlert[]>;
};

export const updatePanicAlert = async (payload: PanicAlert) => {
  const response = await fetch(`${BASEURL}/panic-alerts`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.json();

    throw new ApiError({
      statusCode: response.status,
      message: body?.error.message,
    });
  }

  return response.json() as Promise<PanicAlert>;
};

export const getPanicAlertDetails = async (id: number) => {
  const response = await fetch(`${BASEURL}/panic-alerts/${id}`);

  if (!response.ok) {
    const body = await response.json();
    throw new ApiError({
      statusCode: response.status,
      message: body?.error.message,
    });
  }

  return response.json() as Promise<PanicAlertDetails>;
};
