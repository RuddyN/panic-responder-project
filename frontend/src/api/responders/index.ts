import type { Responder } from "./types";

const BASEURL = "http://localhost:3000";

export const getResponders = async () => {
  const response = await fetch(`${BASEURL}/responders`);

  if (!response.ok) {
    const body = await response.json();
    throw await {
      status: body?.status,
      message: body?.msg,
    };
  }

  return response.json() as Promise<Responder[]>;
};