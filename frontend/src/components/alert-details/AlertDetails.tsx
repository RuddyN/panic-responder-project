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
  }, [panicAlert]);

  const onSaveAlert = () => {
    setIsEdit(false);
    reset();

    const reqBody = {
      ...panicAlert,
      status: status as StatusTypes,
      responderId: responderId ? responderId : null,
      updatedAt: new Date(),
    };

    // TODO: handle error case
    mutate(reqBody, {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries({
          queryKey: [PANIC_ALERT_DETAILS_QUERY_KEY],
        });
      },
    });
  };

  //TODO on demand reload
  //TODO change status to a drop down
  return (
    <div className="details-container">
      <div className="header">
        <h3 className="title">Alert details</h3>

        <div className="details-cta">
          <button name="edit" onClick={() => setIsEdit(true)}>
            <Edit2 size={16} />
          </button>
          <button name="save" onClick={onSaveAlert} disabled={!isEdit}>
            <Save size={16} />
          </button>
        </div>
      </div>
      {error ? <div className="error">{error.message}</div> : null}
      <table>
        <tbody>
          {/* TODO make this a drop down */}
          <tr>
            <td>Status</td>
            <td>
              {isEdit ? (
                <input
                  value={status}
                  onChange={({ target }) =>
                    setStatus(target.value as StatusTypes)
                  }
                />
              ) : (
                <p>{status}</p>
              )}
            </td>
          </tr>
          <tr>
            <td>User name</td>
            <td>{panicAlertDetails?.fullName}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{panicAlertDetails?.contact}</td>
          </tr>
          <tr>
            <td>Alert location:</td>
            <td>{panicAlertDetails?.alertLocation}</td>
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
                  value={responderId ? responderId : ""}
                  onChange={({ target }) =>
                    setResponderId(parseInt(target.value))
                  }
                />
              ) : (
                <p>{responderId}</p>
              )}
            </td>
          </tr>
          {panicAlertDetails?.responderLocation ? (
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
                <td>Responder location:</td>
                <td>{panicAlertDetails?.responderLocation}</td>
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
