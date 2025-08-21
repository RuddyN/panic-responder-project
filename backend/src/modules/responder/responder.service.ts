import { getAllResponders } from "../../database/app";

export default class ResponderService {
  fetchAllResponders() {
    const responders = getAllResponders();

    return responders;
  }
}
