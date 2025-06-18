export type TransportationType =
  | "AIRPORT"
  | "BUS_STATION"
  | "TRAIN_STATION"
  | "HARBOR";

export type Transportation = {
  id: string;
  province: string;
  name: string;
  type: TransportationType;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTransportation = Omit<
  Transportation,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTransportation = Partial<CreateTransportation> & {
  id: string;
};
