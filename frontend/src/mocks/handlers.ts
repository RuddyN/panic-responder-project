import { http, HttpResponse } from "msw";
import fixture from './fixture.json'

export const handlers = [
  http.get("http://localhost:3000/panic-alerts", () => {
    return HttpResponse.json(fixture.panicAlertData);
  }),

  http.get("http://localhost:3000/panic-alerts/1", () => {
    return HttpResponse.json(fixture.panicAlertDetails);
  }),
];
