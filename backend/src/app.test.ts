import request from "supertest";
import { app } from "./app";
import { PanicStatus } from "./models/PanicAlertModel";
import { getAllPanicAlerts } from "./database/app";

jest.mock("./database/app.ts", () => ({
  insertUser: jest.fn(() => {
    status: 200;
  }),
  getUserById: jest.fn(() => ({
    id: 2,
    fullName: "John Doe",
    contact: +27988909900,
    email: "john@gmail.com",
    physicalAddress: "14 Avenue",
    emergencyContact: 27988909902,
  })),
  getPanicAlertById: jest.fn(() => ({
    id: 1,
    latitude: 26.09,
    longitude: 33.59,
    location: "Pretoria",
    status: PanicStatus.NEW,
    alertCreatedAt: "Aug 17 2025 13:40:22",
    alertUpdatedAt: "Aug 17 2025 13:40:22",
    userId: 235235,
  })),
  insertPanicAlert: jest.fn(() => {
    status: 200;
  }),
  patchPanicAlert: jest.fn(() => {
    status: 200;
  }),
  getAllPanicAlerts: jest.fn(() => [
    {
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.NEW,
      alertCreatedAt: "Aug 17 2025 13:40:22",
      alertUpdatedAt: "Aug 17 2025 13:40:22",
      userId: 235235,
    },
  ]),
}));

describe("App Controller", () => {
  test("Should add a panic alert", async () => {
    const res = await request(app).post("/panic-alerts").send({
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.NEW,
      alertCreatedAt: "Aug 17 2025 13:40:22",
      alertUpdatedAt: "Aug 17 2025 13:40:22",
      userId: 235235,
    });
    expect(res.statusCode).toEqual(200);
  });

  // TODO: Maybe this should be a paged response / endpoint
  test("should retrieve all panicAlerts", async () => {
    const res = await request(app).get("/panic-alerts");

    expect(res.statusCode).toEqual(200);
    expect(getAllPanicAlerts).toHaveBeenCalled();
  });

  test("Should retrieve all details of a single alert", async () => {
    const res = await request(app).get("/panic-alerts/1");
    expect(res.statusCode).toEqual(200);
  });

  test("Should successfully update alert with responder", async () => {
    const res = await request(app).put("/panic-alerts").send({
      id: 1,
      latitude: 26.09,
      longitude: 33.59,
      location: "Pretoria",
      status: PanicStatus.ASSIGNED,
      createdAt: "Aug 17 2025 13:40:22",
      updatedAt: "Aug 17 2025 13:40:46",
      responderId: 2,
    });

    expect(res.statusCode).toEqual(200);
  });
});
