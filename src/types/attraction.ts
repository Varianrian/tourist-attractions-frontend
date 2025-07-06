export type Attraction = {
  id: string;
  province: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateAttraction = Omit<
  Attraction,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateAttraction = Partial<CreateAttraction> & {
  id: string;
};
