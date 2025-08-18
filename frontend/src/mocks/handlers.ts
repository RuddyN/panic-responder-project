import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/panic-alerts", () => {
    return HttpResponse.json([
      {
        latitude: -25.7566,
        longitude: 28.1914,
        status: "NEW",
        userId: 1,
      },
      {
        latitude: -25.6682,
        longitude: 27.2386,
        status: "ASSIGNED",
        userId: 2,
        responderId: 1,
      },
    ]);
  }),
];
