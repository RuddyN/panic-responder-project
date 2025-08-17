import {
  insertPanicAlert,
  insertUser,
  getUserById,
  patchPanicAlert,
} from "../database/app";
import { PanicAlertModel, PanicStatus } from "../models/PanicAlertModel";
import { UserModel } from "../models/UserModel";
import { PanicAlert } from "./panic-alert.service";

jest.mock("./../database/app.ts", () => ({
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
    location: "34'235'352",
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
  test("should add a user", () => {
    const userData: UserModel = {
      fullName: "John Doe",
      contact: +27988909900,
      email: "john@gmail.com",
      physicalAddress: "14 Avenue",
      emergencyContact: +27988909902,
    };
    const panicAlertService = new PanicAlert();
    panicAlertService.addUser(userData);

    expect(insertUser).toHaveBeenCalledWith(userData);
  });

  test("should add a panic alert", () => {
    const panicAlertService = new PanicAlert();

    const alert: PanicAlertModel = {
      location: "34'235'352",
      status: PanicStatus.NEW,
      userId: 235235,
    };

    panicAlertService.addPanicAlert(alert);

    expect(getUserById).toHaveBeenCalled();
    expect(insertPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when a responder has been assigned", () => {
    const panicAlertService = new PanicAlert();

    const alert: PanicAlertModel = {
      location: "34'235'352",
      status: PanicStatus.NEW,
      userId: 235235,
      responderId: 35456,
    };

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalled();
  });

  test("should update alert when status changes", () => {
    const panicAlertService = new PanicAlert();

    const alert: PanicAlertModel = {
      location: "34'235'352",
      status: PanicStatus.RESOLVED,
      userId: 235235,
      responderId: 35456,
    };

    panicAlertService.updatePanicAlert(alert);

    expect(patchPanicAlert).toHaveBeenCalledWith(alert);
  });

  test.todo('handle errors')
  test.todo('add tests for get all users and all alerts')
});
