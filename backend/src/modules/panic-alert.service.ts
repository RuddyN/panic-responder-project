import {
  insertPanicAlert,
  insertUser,
  getPanicAlertById,
  getUserById,
  patchPanicAlert,
  getAllUsers,
  getAllPanicAlerts,
} from "../database/app";
import { PanicAlertModel } from "../models/PanicAlertModel";
import { UserModel } from "../models/UserModel";

export class PanicAlert {
  addUser = (user: UserModel) => {
    try {
      insertUser(user);
    } catch (error) {
      // TODO: Handle errors
      console.error("something went wrong whiles adding user");
    }
  };

  fetchUsers = () => {
    try {
      const response = getAllUsers();
      return response;
    } catch (error) {
      // TODO: Handle errors
      console.error("something went wrong whiles fetching all users");
    }
  };

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
      console.log({alerts})
      return alerts;
    } catch (error) {
      console.error("Something went wrong while fetch alerts");
    }
  };
}
