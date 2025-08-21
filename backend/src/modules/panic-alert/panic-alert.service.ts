import {
  insertPanicAlert,
  patchPanicAlert,
  getUnresolvedPanicAlerts,
  getPanicAlertById,
  getResponderById,
  getLatestAlertsByUserId,
  getStats,
  patchResponderStatus,
} from "../../database/app";
import EntityNotFoundError from "../../middleware/entity-no-found-error";
import {
  PanicAlertDetailsModel,
  PanicAlertModel,
  PanicAlertStats,
  PanicStatus,
} from "../../models/PanicAlertModel";

import ResponderService from "../responder/responder.service";
import {
  AlertResponderDistance,
  ResponderModel,
} from "../../models/ResponderModel";
import { distanceCalculator } from "./utils";

export class PanicAlertService {
  addPanicAlert = (panicAlert: PanicAlertModel) => {
    if (!this.isAlertValid(panicAlert)) {
      console.error(
        `User with id ${panicAlert.userId} is attempting to log another alert with an hour of the previous one`
      );
      return
    }

    const nearestResponder = this.checkForClosestResponder(panicAlert);

    if (nearestResponder) {
      insertPanicAlert({
        ...panicAlert,
        status: "ASSIGNED",
        responderId: nearestResponder.responder.id,
      });

      return {
        responderVehicle: nearestResponder.responder.vehicleInfo,
        responderContact: nearestResponder.responder.companyContact,
      };
    }

    insertPanicAlert(panicAlert);
  };

  isAlertValid = (newAlert: PanicAlertModel) => {
    const alerts = getLatestAlertsByUserId(newAlert.userId);

    const timeInMilliseconds = 10000; // ⏰ This can be longer, leaving it as 10 sec for testing

    if (alerts?.length > 0) {
      const loggedAlert = alerts.find((alert) => {
        const convertOldDate = new Date(alert.createdAt);
        const convertNewDate = new Date(newAlert.createdAt);

        if (convertOldDate.getDate() === convertNewDate.getDate()) {
          const createdAtTime = convertOldDate.getTime();
          const newAlertTime = convertNewDate.getTime();

          const diffInMilliseconds = Math.abs(createdAtTime - newAlertTime);

          return diffInMilliseconds <= timeInMilliseconds;
        }
      });

      return !loggedAlert;
    }

    return true;
  };

  checkForClosestResponder = (
    alert: PanicAlertModel
  ): AlertResponderDistance | null => {
    const responderService = new ResponderService();
    const responders = responderService.fetchAllResponders();

    // TODO what happens if all responders are assigned
    const respondersWithDistance = responders
      .filter((responder) => responder.status !== "ASSIGNED")
      .reduce((result: any, val: ResponderModel) => {
        const distance = distanceCalculator({
          alertLat: alert.latitude,
          alertLong: alert.longitude,
          responderLat: val.latitude,
          responderLong: val.longitude,
        });

        return [
          ...result,
          {
            distance: distance,
            responder: val,
          },
        ];
      }, []);

    if (respondersWithDistance) {
      const nearestResponder = respondersWithDistance.reduce(
        (res: AlertResponderDistance, val: AlertResponderDistance) => {
          res = val.distance < res.distance ? val : res;

          return res;
        },
        respondersWithDistance[0]
      );

      return nearestResponder;
    }

    return null;
  };

  updatePanicAlert = (panicAlert: PanicAlertModel) => {
    if (panicAlert.responderId) {
      const responder = getResponderById(panicAlert.responderId);
      patchPanicAlert(panicAlert);
      patchResponderStatus(panicAlert.responderId, "ASSIGNED");

      if (!responder) {
        console.error(
          `Responder with id ${panicAlert.responderId} does not exist`
        );
        throw new EntityNotFoundError("Responder not found", 404);
      }

      return;
    }

    patchPanicAlert(panicAlert);
  };

  fetchPanicAlerts = (): PanicAlertModel[] => {
    try {
      const alerts = getUnresolvedPanicAlerts();
      return alerts;
    } catch (error) {
      console.error("Something went wrong while fetch alerts");
      throw new Error("Something happened on our side");
    }
  };

  getPanicAlertDetails = (id: number): PanicAlertDetailsModel => {
    const alert = getPanicAlertById(id);

    if (!alert) {
      console.error(`Alert with id ${id} does not exist`);
      throw new EntityNotFoundError("Alert not found", 404);
    }

    let response: PanicAlertDetailsModel = {
      id: id,
      alertLatitude: alert.latitude,
      alertLongitude: alert.longitude,
      status: alert.status as unknown as PanicStatus,
      alertCreatedAt: alert.createdAt,
      alertUpdatedAt: alert.updatedAt,
      userFullName: alert.userFullName,
      userContact: alert.userContact,
    };

    if (alert.responderId) {
      const responder = getResponderById(alert.responderId);

      if (!responder) {
        console.error(`Responder with id ${id} does not exist`);
        throw new EntityNotFoundError("Responder not found", 404);
      }

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

  fetchPanicAlertsStats = (): PanicAlertStats => {
    const response = getStats();

    return response;
  };
}
