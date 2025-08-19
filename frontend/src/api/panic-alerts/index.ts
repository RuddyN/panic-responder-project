import type { PanicAlertDetails, PanicAlert } from "./types";

const BASEURL = "http://localhost:3000";

export const getPanicAlerts = async () => {
  const response = await fetch(`${BASEURL}/panic-alerts`);

  if (!response.ok) {
    const body = await response.json();
    throw await {
      status: body?.status,
      message: body?.msg,
    };
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
    throw await {
      status: body?.status,
      message: body?.msg,
    };
  }

  return response.json() as Promise<PanicAlert>;
};

export const getPanicAlertDetails = async (id: number) => {
  const response = await fetch(`${BASEURL}/panic-alerts/${id}`);

  if (!response.ok) {
    const body = await response.json();
    throw await {
      status: body?.status,
      message: body?.msg,
    };
  }

  return response.json() as Promise<PanicAlertDetails>;
};
