export type StatusTypes = "NEW" | "ASSIGNED" | "RESOLVED";

export type PanicAlert = {
  id: number;
  latitude: number;
  longitude: number;
  status: StatusTypes;
  userId: number;
  userFullName: string;
  userContact: number;
  responderId: null | number;
};

export type PanicAlertDetails = {
  id: number;
  alertLatitude: number;
  alertLongitude: number;
  status: StatusTypes;
  alertCreatedAt: string;
  alertUpdatedAt: string;
  userFullName: string;
  userContact: number;
  company?: string;
  responderId: number | null;
  responderContact?: number;
  responderEmail?: string;
  responderLatitude?: number;
  responderLongitude?: number;
  vehicleInfo?: string;
};

export type PanicAlertRequest = {
  status: StatusTypes;
  responderVehicleInfo: string;
};
