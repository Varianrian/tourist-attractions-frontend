export type AttractionType = 
  | "NATURAL"
  | "HISTORICAL"
  | "CULTURAL"
  | "RELIGIOUS"
  | "RECREATIONAL";

export type Attraction = {
  id: string;
  province: string;
  name: string;
  type: AttractionType;
  latitude: number;
  longitude: number;
  description: string;
  ticketPrice: number | null;
  openingHours: string | null;
  imageUrl: string | null;
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
