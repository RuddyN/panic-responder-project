
export enum PanicStatus {
  NEW,
  ASSIGNED,
  PENDING,
  RESOLVED
}

export interface PanicAlertModel {
  id?: number,
  location: string,
  status: PanicStatus,
  userId: number,
  responderId?: number
}