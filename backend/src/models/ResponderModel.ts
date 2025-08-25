export interface ResponderModel {
  id?: number;
  company: string;
  contact: number;
  companyContact: number;
  email: string;
  status: string;
  latitude: number;
  longitude: number;
  vehicleInfo: string;
  serviceType: string;
}

export type AlertResponderDistance = {
  distance: number;
  responder: ResponderModel;
};
