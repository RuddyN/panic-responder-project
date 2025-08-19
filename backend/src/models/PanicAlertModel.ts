export enum PanicStatus {
  NEW,
  ASSIGNED,
  RESOLVED,
}

export interface PanicAlertModel {
  id?: number;
  latitude: number;
  longitude: number;
  location: string;
  status: PanicStatus;
  createdAt: string;
  updatedAt: string;
  userId: number;
  responderId?: number | null;
}

// TODO: consider making this type. a group of other types
export interface PanicAlertDetailsModel {
  id: number;
  alertLatitude: number;
  alertLongitude: number;
  alertLocation: string;
  status: PanicStatus;
  alertCreatedAt: string;
  alertUpdatedAt: string;
  fullName: string;
  contact: number;
  email: string;
  physicalAddress: string;
  emergencyContact: number;
  company?: string;
  responderId?: number;
  responderContact?: number;
  responderEmail?: string;
  responderLatitude?: number;
  responderLongitude?: number;
  responderLocation?: string;
  vehicleInfo?: string;
}
