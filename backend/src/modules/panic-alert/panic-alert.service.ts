import {
  insertPanicAlert,
  getUserById,
  patchPanicAlert,
  getAllPanicAlerts,
  getPanicAlertById,
  getResponderById,
} from "../../database/app";
import {
  PanicAlertDetailsModel,
  PanicAlertModel,
} from "../../models/PanicAlertModel";

export class PanicAlertService {
  addPanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      const user = getUserById(panicAlert.userId);

      if (user) {
        insertPanicAlert(panicAlert);
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error(`something went wrong while adding a panic ${error}`);
    }
  };

  updatePanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      const response = patchPanicAlert(panicAlert);

      return response;
    } catch (error) {
      // TODO: Handle errors, this should make more noise
      console.error(`something went wrong while updating a panic ${error}`);
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

  getPanicAlertDetails = (id: number) => {
    try {
      const alert = getPanicAlertById(id);

      if (alert) {
        const user = getUserById(alert.userId);

        if (user && alert.id) {
          let response: PanicAlertDetailsModel = {
            id: alert.id,
            alertLatitude: alert.latitude,
            alertLongitude: alert.longitude,
            alertLocation: alert.location,
            status: alert.status,
            alertCreatedAt: alert.createdAt,
            alertUpdatedAt: alert.updatedAt,
            fullName: user.fullName,
            contact: user.contact,
            email: user.email,
            physicalAddress: user.physicalAddress,
            emergencyContact: user.emergencyContact,
          };

          if (alert.responderId) {
            const responder = getResponderById(alert.responderId);

            response = {
              ...response,
              responderId: responder.id,
              company: responder.company,
              responderContact: responder.contact,
              responderEmail: responder.email,
              responderLatitude: responder.latitude,
              responderLongitude: responder.longitude,
              responderLocation: responder.location,
              vehicleInfo: responder.vehicleInfo,
            };
          }

          return response;
        } else {
          throw new Error(`User with id ${alert.userId} does not exist`);
        }
      } else {
        throw new Error(`Alert with id ${id} does not exist`);
      }
    } catch (error) {
      //TODO handle all errors
      console.error(`Something went wrong ${error}`);
    }
  };
}
