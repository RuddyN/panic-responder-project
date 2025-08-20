import {
  insertPanicAlert,
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

const isAlertValid = (newAlert: PanicAlertModel) => {
  const alerts = getLatestAlertsByUserId(newAlert.userId);

  const hourInMilliseconds = 60 * 60 * 1000;

  if (alerts?.length > 0) {
    const loggedAlert = alerts.find((alert) => {
      const convertOldDate = new Date(alert.createdAt);
      const convertNewDate = new Date(newAlert.createdAt);
      
      if (convertOldDate.getDate() === convertNewDate.getDate()) {
        const createdAtTime = convertOldDate.getTime();
        const newAlertTime = convertNewDate.getTime();

        const diffInMilliseconds = Math.abs(createdAtTime - newAlertTime);

        return diffInMilliseconds <= hourInMilliseconds;
      }
    });

    return !loggedAlert;
  }

  return true;
};

export class PanicAlertService {
  addPanicAlert = (panicAlert: PanicAlertModel) => {
    if (isAlertValid(panicAlert)) {
      insertPanicAlert(panicAlert);
    } else {
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
      throw new Error("Something happened on our side");
    }
  };

  getPanicAlertDetails = (id: number) => {
    const alert = getPanicAlertById(id);

    if (!alert) {
      console.error(`Alert with id ${id} does not exist`);
      throw new EntityNotFoundError("Alert not found", 404);
    }

    let response: PanicAlertDetailsModel = {
      id: id,
      alertLatitude: alert.latitude,
      alertLongitude: alert.longitude,
      status: alert.status,
      alertCreatedAt: alert.createdAt,
      alertUpdatedAt: alert.updatedAt,
      userFullName: alert.userFullName,
      userContact: alert.userContact,
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
        vehicleInfo: responder.vehicleInfo,
      };
    }

    return response;
  };
}
