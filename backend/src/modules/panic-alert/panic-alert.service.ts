import {
  insertPanicAlert,
  getUserById,
  patchPanicAlert,
  getAllPanicAlerts,
} from "../../database/app";
import { PanicAlertModel } from "../../models/PanicAlertModel";

export class PanicAlertService {
  addPanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      const user = getUserById(panicAlert.userId);

      if (user) {
        insertPanicAlert(panicAlert);
      }
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error(`something went wrong while adding a panic ${error}`);
    }
  };

  updatePanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      patchPanicAlert(panicAlert);
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error("something went wrong while updating a panic");
    }
  };

  fetchPanicAlerts = () => {
    try {
      const alerts = getAllPanicAlerts();
      return alerts;
    } catch (error) {
      console.error("Something went wrong while fetch alerts");
    }
  };
}
