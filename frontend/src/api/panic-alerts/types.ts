type StatusTypes = "NEW" | "ASSIGNED" | "PENDING" | "RESOLVED";

export type ResponseAlert = {
  id: number;
  latitude: number;
  longitude: number;
  userId: number;
  responderId: null | number;
  status: StatusTypes;
};
