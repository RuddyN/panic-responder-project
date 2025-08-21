import haversine from "haversine-distance";

type Coordinates = {
  alertLat: number;
  alertLong: number;
  responderLat: number;
  responderLong: number;
};

export const distanceCalculator = ({
  alertLat,
  alertLong,
  responderLat,
  responderLong,
}: Coordinates) => {
  //First point in your haversine calculation
  var point1 = { lat: alertLat, lng: alertLong };

  //Second point in your haversine calculation
  var point2 = { lat: responderLat, lng: responderLong };

  var haversine_m = haversine(point1, point2); //Results in meters (default)
  var haversine_km = haversine_m / 1000; //Results in kilometers
  return haversine_km;
};
