import request from "supertest";
import { app } from "./app";
import { PanicStatus } from "./models/PanicAlertModel";
import { getAllPanicAlerts } from "./database/app";
import fixture from "./database/fixtures.json";

jest.mock("./database/app.ts", () => ({
  getPanicAlertById: jest.fn(() => ({ ...fixture.panicAlertData[0], id: 1 })),
  insertPanicAlert: jest.fn(() => {
    status: 200;
  }),
  patchPanicAlert: jest.fn(() => {
    status: 200;
  }),
  getAllPanicAlerts: jest.fn(() => fixture.panicAlertData),
  getAllResponders: jest.fn(() => fixture.responderData),
  getLatestAlertsByUserId: jest.fn(() => [
    {
      id: 1,
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.NEW,
      createdAt: "Aug 18 2025 13:40:22",
      updatedAt: "Aug 18 2025 13:40:22",
      userId: 235235,
      userFullName: "Petter Pan",
      userContact: 275674529996,
    },
  ]),
}));

describe("App Controller", () => {
  test("Should add a panic alert", async () => {
    const res = await request(app)
      .post("/panic-alerts")
      .send(fixture.panicAlertData[0]);
    expect(res.statusCode).toEqual(200);
  });

  //TODO: Maybe this should be a paged response / endpoint
  test("should retrieve all panic alerts", async () => {
    const res = await request(app).get("/panic-alerts");

    expect(res.statusCode).toEqual(200);
    expect(getAllPanicAlerts).toHaveBeenCalled();
  });

  test("Should retrieve all details of a single alert", async () => {
    const res = await request(app).get("/panic-alerts/1");
    expect(res.statusCode).toEqual(200);
  });

  test("Should successfully update an alert", async () => {
    const res = await request(app).put("/panic-alerts").send({
      id: 1,
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.ASSIGNED,
      createdAt: "Aug 17 2025 13:40:22",
      updatedAt: "Aug 17 2025 13:40:46",
      userId: 1,
    });

    expect(res.statusCode).toEqual(200);
  });

  test("should get all available responders", async () => {
    const res = await request(app).get("/responders");
    expect(res.statusCode).toEqual(200);
  });
});
