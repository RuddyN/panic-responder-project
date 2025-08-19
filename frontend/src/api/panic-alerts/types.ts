export type StatusTypes = "NEW" | "ASSIGNED" | "RESOLVED";

export type PanicAlert = {
  id: number;
  latitude: number;
  longitude: number;
  userId: number;
  responderId: null | number;
  status: StatusTypes;
};

export type PanicAlertDetails = {
  id: number;
  alertLatitude: number;
  alertLongitude: number;
  alertLocation: string;
  status: StatusTypes;
  alertCreatedAt: string;
  alertUpdatedAt: string;
  fullName: string;
  contact: number;
  email: string;
  physicalAddress: string;
  emergencyContact: number;
  company?: string;
  responderId: number | null;
  responderContact?: number;
  responderEmail?: string;
  responderLatitude?: number;
  responderLongitude?: number;
  responderLocation?: string;
  vehicleInfo?: string;
};

export type PanicAlertRequest = {
  status: StatusTypes;
  responderVehicleInfo: string;
};
