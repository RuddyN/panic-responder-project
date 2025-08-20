import {
  insertPanicAlert,
  getUserById,
  patchPanicAlert,
  getAllPanicAlerts,
  getPanicAlertById,
  getResponderById,
  getLatestAlertsByUserId,
} from "../../database/app";
import EntityNotFoundError from "../../middleware/entity-no-found-error";
import {
  PanicAlertDetailsModel,
  PanicAlertModel,
} from "../../models/PanicAlertModel";
import { UserModel } from "../../models/UserModel";

const isAlertValid = (newAlert: PanicAlertModel) => {
  const alerts = getLatestAlertsByUserId(newAlert.userId);

  const hourInMilliseconds = 60 * 60 * 1000;

  if (alerts?.length > 0) {
    const loggedAlert = alerts.find((alert) => {
      const createdAtTime = new Date(alert.createdAt).getTime();
      const newAlertTime = new Date(newAlert.createdAt).getTime();

      const diffInMilliseconds = Math.abs(createdAtTime - newAlertTime);

      return diffInMilliseconds <= hourInMilliseconds;
    });

    return !loggedAlert;
  }

  return true;
};

export class PanicAlertService {
  addPanicAlert = (panicAlert: PanicAlertModel) => {
    try {
      getUserById(panicAlert.userId);
    } catch (error) {
      console.error(`User with id ${panicAlert.userId} does not exist`);
      throw new EntityNotFoundError("User not found", 404);
    }

    if (isAlertValid(panicAlert)) {
      insertPanicAlert(panicAlert);
    } else {
      console.log("ERROR");
      console.error(
        `User with id ${panicAlert.userId} is attempting to log another alert with an hour of the previous one`
      );
    }
  };

  updatePanicAlert = (panicAlert: PanicAlertModel) => {
    if (panicAlert.responderId) {
      try {
        getResponderById(panicAlert.responderId);
      } catch (error) {
        console.error(
          `Responder with id ${panicAlert.responderId} does not exist`
        );
        throw new EntityNotFoundError("Responder not found", 404);
      }
    }

    const response = patchPanicAlert(panicAlert);

    return response;
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
    const alert = getPanicAlertById(id);

    if (!alert) {
      console.error(`Alert with id ${id} does not exist`);
      throw new EntityNotFoundError("Alert not found", 404);
    }

    const user: UserModel = getUserById(alert.userId);

    if (!user) {
      console.error(`User with id ${alert.userId} does not exist`);
      throw new EntityNotFoundError("User not found", 404);
    }

    let response: PanicAlertDetailsModel = {
      id: id,
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
  };
}
