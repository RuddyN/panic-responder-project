export enum PanicStatus {
  NEW,
  ASSIGNED,
  RESOLVED,
}

export interface PanicAlertModel {
  id?: number;
  latitude: number;
  longitude: number;
  status: PanicStatus;
  createdAt: string;
  updatedAt: string;
  userId: number;
  userFullName: string;
  userContact: number;
  responderId?: number | null;
}

// TODO: consider making this type. a group of other types
export interface PanicAlertDetailsModel {
  id: number;
  alertLatitude: number;
  alertLongitude: number;
  status: PanicStatus;
  alertCreatedAt: string;
  alertUpdatedAt: string;
  userFullName: string;
  userContact: number;
  company?: string;
  responderId?: number;
  responderContact?: number;
  responderEmail?: string;
  responderLatitude?: number;
  responderLongitude?: number;
  responderLocation?: string;
  vehicleInfo?: string;
}
