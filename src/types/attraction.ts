export type AttractionType = "NATURAL" | "CULTURAL" | "ARTIFICIAL";

export type Attraction = {
  id: string;
  province: string;
  name: string;
  type: AttractionType;
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
