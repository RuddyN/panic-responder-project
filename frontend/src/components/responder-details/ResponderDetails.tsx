import "./styles.css";
import type { Responder } from "../../api/responders/types";

export function ResponderDetails({ responder }: { responder: Responder }) {
  return (
    <div className="responder-container">
      <h3 className="title">Responder details</h3>

      <table>
        <tbody>
          <tr>
            <td>Responder Id:</td>
            <td>{responder?.id}</td>
          </tr>
          <tr>
            <td>Responder vehicle:</td>
            <td>{responder?.vehicleInfo}</td>
          </tr>
          <tr>
            <td>Responder contact:</td>
            <td>{responder?.contact}</td>
          </tr>
          <tr>
            <td>Responder coordinates:</td>
            <td>
              {responder?.latitude} {responder?.longitude}
            </td>
          </tr>
          <tr>
            <td>Responder Email:</td>
            <td>{responder?.email}</td>
          </tr>
          <tr>
            <td>Responder company:</td>
            <td>{responder?.company}</td>
          </tr>
          <tr>
            <td>Responder company contact:</td>
            <td>{responder.companyContact}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
