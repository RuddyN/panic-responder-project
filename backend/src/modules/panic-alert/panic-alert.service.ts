import {
  insertPanicAlert,
  getUserById,
  patchPanicAlert,
  getAllPanicAlerts,
  getPanicAlertById,
  getResponderById,
} from "../../database/app";
import EntityNotFoundError from "../../middleware/entity-no-found-error";
import {
  PanicAlertDetailsModel,
  PanicAlertModel,
} from "../../models/PanicAlertModel";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Error"; // Optional: set a specific name for the error
  }
}

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
    if (panicAlert.responderId) {
      const responder = getResponderById(panicAlert.responderId);

      if (!responder) {
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

    const user = getUserById(alert.userId);

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
