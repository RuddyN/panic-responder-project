import request from "supertest";
import { app } from "./app";
import { PanicAlertModel, PanicStatus } from "./models/PanicAlertModel";
import { getPanicAlertById, getUnresolvedPanicAlerts } from "./database/app";
import fixture from "./database/fixtures.json";

jest.mock("./database/app.ts", () => ({
  getPanicAlertById: jest.fn(() => ({ ...fixture.panicAlertData[0], id: 9 })),
  insertPanicAlert: jest.fn(),
  patchPanicAlert: jest.fn(),
  getUnresolvedPanicAlerts: jest.fn(() => fixture.panicAlertData),
  getAllResponders: jest.fn(() => fixture.responderData),
  getLatestAlertsByUserId: jest.fn(() => [
    {
      id: 1,
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.NEW,
      createdAt: "2025-08-20 21:42:09",
      updatedAt: "2025-08-20 21:42:09",
      userId: 235235,
      userFullName: "Petter Pan",
      userContact: 275674529996,
    },
  ]),
}));

const mockFoo = jest.mocked(getPanicAlertById)

describe("App Controller", () => {

  test("Should add a panic alert", async () => {
    const res = await request(app)
      .post("/panic-alerts")
      .send(fixture.panicAlertData[0]);
    expect(res.statusCode).toEqual(200);
  });

  test("should retrieve NEW and ASSIGNED panic alerts", async () => {
    const res = await request(app).get("/panic-alerts");

    expect(res.statusCode).toEqual(200);
    expect(getUnresolvedPanicAlerts).toHaveBeenCalled();
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
      createdAt: "2025-08-20 21:42:09",
      updatedAt: "2025-08-20 21:42:46",
      userId: 1,
    });

    expect(res.statusCode).toEqual(200);
  });

  test("should get all available responders", async () => {
    const res = await request(app).get("/responders");
    expect(res.statusCode).toEqual(200);
  });

  test("Should return 404 if alert does not exist", async() => {
    mockFoo.mockReturnValue(undefined as unknown as PanicAlertModel)
    const res = await request(app).get("/panic-alerts/100");
    expect(res.statusCode).toEqual(404);
  });
});
