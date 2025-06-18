export interface Province {
  id: string;
  name: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  createdAt: string;
  updatedAt: string;
}
