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
    contact: +27988909900,
    email: "john@gmail.com",
    physicalAddress: "14 Avenue",
    emergencyContact: +27988909902,
  })),
  getPanicAlertById: jest.fn(() => ({
    latitude: 26.09,
    longitude: 33.59,
    status: PanicStatus.NEW,
    userId: 235235,
  })),
  insertPanicAlert: jest.fn(() => {
    status: 200;
  }),
  patchPanicAlert: jest.fn(() => {
    status: 200;
  }),
}));

describe("Panic alerts", () => {
  test("should add a panic alert", () => {
    const panicAlertService = new PanicAlertService();

    const alert: PanicAlertModel = {
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.NEW,
      userId: 235235,
      responderId: null
    };

    panicAlertService.addPanicAlert(alert);

    expect(getUserById).toHaveBeenCalled();
    expect(insertPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when a responder has been assigned", () => {
    const panicAlertService = new PanicAlertService();

    const alert: PanicAlertModel = {
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.NEW,
      userId: 235235,
      responderId: 35456,
    };

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when status changes", () => {
    const panicAlertService = new PanicAlertService();

    const alert: PanicAlertModel = {
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.RESOLVED,
      userId: 235235,
      responderId: 35456,
    };

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalledWith(alert);
  });

  test.todo("handle errors");
  test.todo("add tests for get all users and all alerts");
});
