
export enum PanicStatus {
  NEW,
  ASSIGNED,
  PENDING,
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