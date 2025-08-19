import { getAllResponders } from "../../database/app";

export default class ResponderService {

  // TODO: add error handling
  fetchAllResponders() {
    const responders = getAllResponders();

    return responders;
  }
}
