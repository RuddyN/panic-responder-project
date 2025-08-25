import { PanicAlert, Responder } from "./types";

const BASEURL = "http://localhost:3000";

export const AddPanicAlert = async (payload: PanicAlert) => {
  const response = await fetch(`${BASEURL}/panic-alerts`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(
      "Something went wrong while logging alert, If you can please call 27737867755"
    );
  }

  return response.json() as Promise<Responder>;
};
