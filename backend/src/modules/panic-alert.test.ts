import { addUser } from "../database/app";
import { PanicAlert } from "./panic-alert.service";

jest.mock("./../database/app.ts", () => ({
  addUser: jest.fn(() => {
    status: 200;
  }),
}));

describe("Panic alerts", () => {
  test("should add a user", () => {
    const panicAlertService = new PanicAlert()
    panicAlertService.createUser()

    expect(addUser).toHaveBeenCalled()
  });
});
