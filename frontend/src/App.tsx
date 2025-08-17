import "./App.css";
import { Map, Marker } from "pigeon-maps";
import { usePanicAlerts } from "./hooks/panic-alerts";

function App() {
  const { data: panicAlerts } = usePanicAlerts();

  return (
    <>
      <div>
        <p>Start app here</p>
        <div id="map" style={{ height: "800px", width: "60vw" }}>
          <Map height={300} center={[-26.204103, 28.047304]} defaultZoom={5}>
            {panicAlerts?.map((alerts) => {
              return (
                <Marker
                  width={50}
                  anchor={[alerts.latitude, alerts.longitude]}
                />
              );
            })}
          </Map>
        </div>
      </div>
    </>
  );
}

export default App;
