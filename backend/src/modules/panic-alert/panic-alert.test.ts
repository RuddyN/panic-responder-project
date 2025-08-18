import {
  insertPanicAlert,
  getUserById,
  patchPanicAlert,
} from "../../database/app";
import { PanicAlertModel, PanicStatus } from "../../models/PanicAlertModel";
import { PanicAlertService } from "./panic-alert.service";

jest.mock("./../../database/app.ts", () => ({
  insertUser: jest.fn(() => {
    status: 200;
  }),
  getUserById: jest.fn(() => ({
    id: 235235,
    fullName: "John Doe",
    contact: 27988909900,
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
    createdAt: "Aug 17 2025 13:40:22",
    updatedAt: "Aug 17 2025 13:40:22",
    userId: 235235,
    responderId: 2,
  })),
  getResponderById: jest.fn(() => ({
    id: 2,
    company: "Red Guard Security",
    contact: 275674329988,
    companyContact: 275674329988,
    email: "redGuard@gmail.com",
    latitude: -25.7566,
    longitude: 28.1914,
    location: "Sandton",
    vehicleInfo: "ZZ 78 FG GP",
    serviceType: "Security",
  })),
  insertPanicAlert: jest.fn(() => {
    status: 200;
  }),
  patchPanicAlert: jest.fn(() => {
    status: 200;
  }),
}));

describe("Panic alerts", () => {
  const alert: PanicAlertModel = {
    latitude: 26.09,
    longitude: 33.59,
    location: "Pretoria",
    status: PanicStatus.NEW,
    createdAt: "Aug 17 2025 13:40:22",
    updatedAt: "Aug 17 2025 13:40:22",
    userId: 235235,
    responderId: null,
  };
  test("should add a panic alert", () => {
    const panicAlertService = new PanicAlertService();

    panicAlertService.addPanicAlert(alert);

    expect(getUserById).toHaveBeenCalled();
    expect(insertPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when a responder has been assigned", () => {
    const panicAlertService = new PanicAlertService();

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when status changes", () => {
    const panicAlertService = new PanicAlertService();

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalledWith(alert);
  });

  test("Should retrieve all details of a single alert", async () => {
    const panicAlertService = new PanicAlertService();

    const res = panicAlertService.getPanicAlertDetails(1);

    expect(res).toEqual({
      id: 1,
      alertLatitude: 26.09,
      alertLongitude: 33.59,
      alertLocation: "Pretoria",
      status: PanicStatus.NEW,
      alertCreatedAt: "Aug 17 2025 13:40:22",
      alertUpdatedAt: "Aug 17 2025 13:40:22",
      fullName: "John Doe",
      contact: 27988909900,
      email: "john@gmail.com",
      physicalAddress: "14 Avenue",
      emergencyContact: 27988909902,
      company: "Red Guard Security",
      responderContact: 275674329988,
      responderEmail: "redGuard@gmail.com",
      responderLatitude: -25.7566,
      responderLongitude: 28.1914,
      responderLocation: "Sandton",
      vehicleInfo: "ZZ 78 FG GP",
    });
  });

  test.todo("handle errors");
  test.todo("add tests for get all users and all alerts");
});
