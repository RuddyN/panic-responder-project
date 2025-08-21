import { useEffect, useState } from "react";
import {
  PANIC_ALERT_DETAILS_QUERY_KEY,
  usePanicAlertDetails,
  useUpdatePanicAlert,
} from "../../hooks/panic-alerts";
import "./styles.css";
import { Edit2, Save } from "lucide-react";
import type { PanicAlert, StatusTypes } from "../../api/panic-alerts/types";
import { useQueryClient } from "@tanstack/react-query";

export function AlertDetails({ panicAlert }: { panicAlert: PanicAlert }) {
  const { data: panicAlertDetails, refetch } = usePanicAlertDetails(
    panicAlert.id
  );
  const { mutate, error, reset } = useUpdatePanicAlert();
  const [status, setStatus] = useState<StatusTypes>();
  const [isEdit, setIsEdit] = useState(false);
  const [responderId, setResponderId] = useState<number | null>();

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsEdit(false);

    const initStatus = panicAlertDetails
      ? panicAlertDetails.status
      : panicAlert.status;
    setStatus(initStatus);

    const respId = panicAlertDetails?.responderId
      ? panicAlertDetails.responderId
      : panicAlert.responderId;
    setResponderId(respId);
  }, [panicAlert, panicAlertDetails]);

  const onSaveAlert = () => {
    setIsEdit(false);
    reset();

    const reqBody = {
      ...panicAlert,
      status: status as StatusTypes,
      responderId: responderId ? responderId : null,
      updatedAt: new Date(),
    };

    mutate(reqBody, {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries({
          queryKey: [PANIC_ALERT_DETAILS_QUERY_KEY],
        });
      },
    });
  };

  return (
    <div className="details-container">
      <div className="header">
        <h3 className="title">Alert details</h3>

        <div className="details-cta">
          <button name="edit" aria-label="edit" onClick={() => setIsEdit(true)}>
            <Edit2 size={16} />
          </button>
          <button
            name="save"
            aria-label="save"
            onClick={onSaveAlert}
            disabled={!isEdit}
          >
            <Save size={16} />
          </button>
        </div>
      </div>
      {error ? <div className="error">{error.message}</div> : null}
      <table>
        <tbody>
          <tr>
            <td>Status:</td>
            <td className="status-td">
              {isEdit ? (
                <select
                  value={status}
                  onChange={({ target }) =>
                    setStatus(target.value as StatusTypes)
                  }
                  className="status-select"
                  name="status select"
                >
                  <option
                    value="NEW"
                    disabled={status === "ASSIGNED" || status === "RESOLVED"}
                  >
                    NEW
                  </option>
                  <option value="ASSIGNED" disabled={status === "RESOLVED"}>
                    ASSIGNED
                  </option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              ) : (
                <p>{status}</p>
              )}
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{panicAlertDetails?.userFullName}</td>
          </tr>
          <tr>
            <td>Contact:</td>
            <td>{panicAlertDetails?.userContact}</td>
          </tr>

          <tr>
            <td>Alert coordinates:</td>
            <td>
              {panicAlertDetails?.alertLatitude}{" "}
              {panicAlertDetails?.alertLongitude}
            </td>
          </tr>
          <tr>
            <td>Created at:</td>
            <td>{panicAlertDetails?.alertCreatedAt}</td>
          </tr>
          <tr>
            <td>Updated at:</td>
            <td>{panicAlertDetails?.alertUpdatedAt}</td>
          </tr>

          <tr>
            <td>Responder Id:</td>

            <td>
              {isEdit ? (
                <input
                  type="number"
                  name="responder id"
                  value={responderId ? responderId : ""}
                  onChange={({ target }) =>
                    setResponderId(parseInt(target.value))
                  }
                  className="responder-input"
                />
              ) : (
                <p>{responderId}</p>
              )}
            </td>
          </tr>
          {panicAlertDetails?.responderId ? (
            <>
              <tr>
                <td>Responder vehicle:</td>
                <td>{panicAlertDetails?.vehicleInfo}</td>
              </tr>
              <tr>
                <td>Responder contact:</td>
                <td>{panicAlertDetails?.responderContact}</td>
              </tr>
              <tr>
                <td>Responder coordinates:</td>
                <td>
                  {panicAlertDetails?.responderLatitude}{" "}
                  {panicAlertDetails?.responderLongitude}
                </td>
              </tr>
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
