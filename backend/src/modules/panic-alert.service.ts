import { insertPanicAlert, insertUser, getPanicAlertById, getUserById, patchPanicAlert } from "../database/app";
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

  addPanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      const user = getUserById(panicAlert.userId);

      if (user) {
        insertPanicAlert(panicAlert);
      }
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error("something went wrong while adding a panic");
    }
  };

  updatePanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      patchPanicAlert(panicAlert)
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error("something went wrong while updating a panic");
    }
  };
}
