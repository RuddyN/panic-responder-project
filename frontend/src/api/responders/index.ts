import { ApiError } from "../api-error";
import type { Responder } from "./types";

const BASEURL = "http://localhost:3000";

export const getResponders = async () => {
  const response = await fetch(`${BASEURL}/responders`);

  if (!response.ok) {
    const body = await response.json();
    throw new ApiError({
      statusCode: response.status,
      message: body?.error.message,
    });
  }

  return response.json() as Promise<Responder[]>;
};
