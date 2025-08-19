import "./App.css";
import { Map, Marker } from "pigeon-maps";
import { usePanicAlerts } from "./hooks/panic-alerts";
import type { PanicAlert } from "./api/panic-alerts/types";
import { useState } from "react";
import { AlertDetails } from "./components/alert-details/AlertDetails";
import { useResponders } from "./hooks/responder";
import type { Responder } from "./api/responders/types";
import { CarFrontIcon } from "lucide-react";

function App() {
  const { data: panicAlerts } = usePanicAlerts(); // only get new and assigned alerts
  const { data: responders } = useResponders();
  //TODO create endpoint to get the stats
  const [selectedAlert, setSelectedAlert] = useState<PanicAlert>();
  const [selectedResponder, setSelectedResponder] = useState<Responder>();

  // TODO make different status marker different colors

  const getDetails = () => {
    if (selectedAlert) {
      return <AlertDetails panicAlert={selectedAlert} />;
    }

    if (selectedResponder) {
      return <div>Responder details</div>;
    }
  };

  return (
    <section>
      <h1 className="title">Panic Alert System</h1>
      <div className="stats">
        <div className="stats-block">
          <h4>New </h4>
          <p>1</p>
        </div>
        <div className="stats-block">
          <h3>Active </h3>
          <p>3</p>
        </div>
        <div className="stats-block">
          <h3>Resolved today</h3>
          <p data-testid="total-alerts">{panicAlerts?.length}</p>
        </div>
        <div className="stats-block">
          <h3>Total alerts today</h3>
          <p>Red Guard Security</p>
        </div>
      </div>
      <div className="map-details">
        <Map height={400} center={[-26.204103, 28.047304]} defaultZoom={5}>
          {panicAlerts?.map((alert) => {
            return (
              <Marker
                width={50}
                anchor={[alert.latitude, alert.longitude]}
                onClick={() => setSelectedAlert(alert)}
              />
            );
          })}
          {responders?.map((responder) => {
            return (
              <Marker
                color="orange"
                width={50}
                children={
                  <CarFrontIcon
                    onClick={() => setSelectedResponder(responder)}
                    className="car"
                    strokeWidth="3"
                  />
                }
                anchor={[responder.latitude, responder.longitude]}
              />
            );
          })}
        </Map>
        <div className="marker-details">
          {selectedAlert || selectedResponder ? (
            getDetails()
          ) : (
            <div className="empty-details">Select marker</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
