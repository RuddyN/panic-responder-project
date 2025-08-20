import { insertPanicAlert, patchPanicAlert } from "../../database/app";
import { PanicAlertModel, PanicStatus } from "../../models/PanicAlertModel";
import { PanicAlertService } from "./panic-alert.service";
import fixture from "./../../database/fixtures.json";

const today = new Date();

jest.mock("./../../database/app.ts", () => ({
  getPanicAlertById: jest.fn(() => ({
    id: 1,
    ...fixture.panicAlertData[1],
  })),
  getResponderById: jest.fn(() => ({
    id: 2,
    ...fixture.responderData[1],
  })),
  insertPanicAlert: jest.fn(() => {
    status: 200;
  }),
  patchPanicAlert: jest.fn(() => {
    status: 200;
  }),
  getLatestAlertsByUserId: jest.fn(() => [
    {
      id: 1,
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.NEW,
      createdAt: "2025-08-20 21:42:09",
      updatedAt: "2025-08-20 21:42:09",
      userId: 235235,
      userFullName: "Petter Pan",
      userContact: 275674529996,
    },
    {
      id: 2,
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.NEW,
      createdAt: today.toString(),
      updatedAt: "2025-08-20 21:42:09",
      userId: 235235,
      userFullName: "Harry Potter",
      userContact: 275674529996,
    },
  ]),
}));

describe("Panic alerts", () => {
  const alert: PanicAlertModel = {
    latitude: 26.09,
    longitude: 33.59,
    status: PanicStatus.NEW,
    createdAt: "2025-08-18 21:42:09",
    updatedAt: "2025-08-18 21:42:09",
    userId: 235235,
    userFullName: "Petter Pan",
    userContact: 275674529996,
    responderId: null,
  };

  // afterEach(() => {
  //   jest.resetAllMocks()
  //   jest.clearAllMocks()
  // })

  test("should add a panic alert", () => {
    const panicAlertService = new PanicAlertService();

    panicAlertService.addPanicAlert(alert);

    expect(insertPanicAlert).toHaveBeenCalled();
  });

  test.skip("should NOT add an alert with one hour of an existing alert", () => {
    const panicAlertService = new PanicAlertService();
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 5);

    const updatedAlert = {
      latitude: 26.09,
      longitude: 33.59,
      status: PanicStatus.NEW,
      updatedAt: "2025-08-18 21:42:09",
      userId: 235235,
      userFullName: "Petter Pan",
      userContact: 275674529996,
      responderId: null,
      createdAt: currentDate.toString(),
    };

    panicAlertService.addPanicAlert(updatedAlert);

    expect(insertPanicAlert).not.toHaveBeenCalled();
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
      alertLatitude: -25.6682,
      alertLongitude: 27.2386,
      status: "ASSIGNED",
      alertCreatedAt: "2025-08-11 21:42:09",
      alertUpdatedAt: "2025-08-18 21:42:09",
      userFullName: "Petter Pan",
      userContact: 275674529996,
      company: "Red Guard Security",
      responderContact: 275674329988,
      responderEmail: "redGuard@gmail.com",
      responderId: 2,
      responderLatitude: -26.0917,
      responderLongitude: 27.96,
      vehicleInfo: "ZZ 78 FG GP",
    });
  });

  test.todo("handle errors");
  test.todo("add tests for get all users and all alerts");
});
