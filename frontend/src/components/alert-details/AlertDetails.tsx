import { useState } from "react";
import {
  usePanicAlertDetails,
  useUpdatePanicAlert,
} from "../../hooks/panic-alerts";
import "./styles.css";
import { Edit2, Save } from "lucide-react";
import type { PanicAlert, StatusTypes } from "../../api/panic-alerts/types";

export function AlertDetails({ panicAlert }: { panicAlert: PanicAlert }) {
  const { data: panicAlertDetails } = usePanicAlertDetails(panicAlert.id);
  const { mutate } = useUpdatePanicAlert();
  const [status, setStatus] = useState(panicAlertDetails?.status);
  const [isEdit, setIsEdit] = useState(false);
  const [responderId, setResponderId] = useState<number | null>(null);

  const onSaveAlert = () => {
    const reqBody = {
      ...panicAlert,
      status: status as StatusTypes,
      responderId: responderId ? responderId : null,
      updatedAt: new Date()
    };

    console.log({reqBody})

    mutate(reqBody, {
      onSuccess: () => {
        console.log("all is well");
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
          <button name="save" onClick={onSaveAlert}>
            <Save size={16} />
          </button>
        </div>
      </div>
      <table>
        <tbody>
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
                <p>{panicAlertDetails?.status}</p>
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
                  value={parseInt(responderId)}
                  onChange={({ target }) =>
                    setResponderId(parseInt(target.value))
                  }
                />
              ) : (
                <p>{panicAlertDetails?.responderId}</p>
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
