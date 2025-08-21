import { http, HttpResponse } from "msw";
import fixture from "./fixture.json";

export const updatePanicAlertMock = http.put(
  "http://localhost:3000/panic-alerts",
  () => {
    return HttpResponse.json(fixture.panicAlertData[1]);
  }
);

export const handlers = [
  http.get("http://localhost:3000/panic-alerts", () => {
    return HttpResponse.json(fixture.panicAlertData);
  }),

  http.get("http://localhost:3000/panic-alerts/1", () => {
    return HttpResponse.json(fixture.panicAlertDetails);
  }),
  http.get("http://localhost:3000/panic-alerts-stats", () => {
    return HttpResponse.json(fixture.alertStats);
  }),
  http.get("http://localhost:3000/responders", () => {
    return HttpResponse.json(fixture.responderData);
  }),
  updatePanicAlertMock,
];
