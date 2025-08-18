import "./App.css";
import { Map, Marker } from "pigeon-maps";
import { usePanicAlerts } from "./hooks/panic-alerts";
import type { ResponseAlert } from "./api/panic-alerts/types";

function App() {
  const { data: panicAlerts } = usePanicAlerts();

  // TODO make different status marker different colors

  const handleAlertDetails = (alert: ResponseAlert) => {
    console.log({alert})
  }

  return (
    <section>
      <h1 className="title">Panic Alert System</h1>
      <div className="stats">
        <div className="stats-block">
          <h4>New </h4>
          <p>1</p>
        </div>
        <div className="stats-block">
          <h3>Assigned </h3>
          <p>3</p>
        </div>
        <div className="stats-block">
          <h3>Total Today</h3>
          <p data-testid="total-alerts">{panicAlerts?.length}</p>
        </div>
        <div className="stats-block">
          <h3>Top responder</h3>
          <p>Red Guard Security</p>
        </div>
      </div>
      <div className="map-details">
        <Map height={400} center={[-26.204103, 28.047304]} defaultZoom={5}>
          {panicAlerts?.map((alert) => {
            return (
              <Marker width={50} anchor={[alert.latitude, alert.longitude]} onClick={() => handleAlertDetails(alert)}/>
            );
          })}
        </Map>
        <div className="marker-details">
          <p>Alert details</p>
        </div>
      </div>
    </section>
  );
}

export default App;
