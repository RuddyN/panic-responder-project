import ResponderService from "./responder.service";
import fixture from "./../../database/fixtures.json";

jest.mock("./../../database/app.ts", () => ({
  getAllResponders: jest.fn(() => fixture.responderData),
}));

describe("Responder Service", () => {
  test("Should get all responders", () => {
    const responderService = new ResponderService();

    const response = responderService.fetchAllResponders();

    expect(response).toHaveLength(3);
  });
});
