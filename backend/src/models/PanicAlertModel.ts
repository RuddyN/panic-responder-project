export enum PanicStatus {
  NEW,
  ASSIGNED,
  RESOLVED,
}

export interface PanicAlertModel {
  id?: number;
  latitude: number;
  longitude: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  userFullName: string;
  userContact: number;
  responderId?: number | null;
}

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
  vehicleInfo?: string;
}

export interface PanicAlertStats {
  totalNewAlerts: number;
  totalActiveAlerts: number;
  closedTodayAlerts: number;
  totalAlertsToday: number;
}
