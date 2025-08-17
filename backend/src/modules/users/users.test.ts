import { insertUser } from "../../database/app";
import { UserModel } from "../../models/UserModel";
import { UserService } from "./user.service";

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
}));

describe("Users", () => {
  test("should add a user", () => {
    const userData: UserModel = {
      fullName: "John Doe",
      contact: +27988909900,
      email: "john@gmail.com",
      physicalAddress: "14 Avenue",
      emergencyContact: +27988909902,
    };
    const userService = new UserService();
    userService.addUser(userData);

    expect(insertUser).toHaveBeenCalledWith(userData);
  });
});
