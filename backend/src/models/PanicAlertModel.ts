
export enum PanicStatus {
  NEW,
  ASSIGNED,
  RESOLVED
}

export interface PanicAlertModel {
  id?: number,
  latitude: number,
  longitude: number,
  status: PanicStatus,
  userId: number,
  responderId?: number | null
}