export type PanicAlert = {
  latitude: number;
  longitude: number;
  userId: number;
  userFullName: string;
  userContact: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Responder = {
  responderVehicle: string;
  responderContact: number | null;
};
