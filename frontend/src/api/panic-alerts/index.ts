import type { ResponseAlert } from "./types";

const BASEURL = "http://localhost:3000";
export async function getPanicAlerts() {
  const response = await fetch(`${BASEURL}/panic-alerts`, {
    headers: {
      "Access-Control-Allow-Origin": "HeadersInit",
    },
  });

  if (!response.ok) {
    const body = await response.json();
    throw await {
      status: body?.status,
      message: body?.msg,
    };
  }

  return response.json() as Promise<ResponseAlert[]>;
}

export async function updatePanicAlerts(payload: ResponseAlert) {
  const response = await fetch(`${BASEURL}/panic-alerts`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json();
    throw await {
      status: body?.status,
      message: body?.msg,
    };
  }

  return response.json() as Promise<ResponseAlert>;
}
