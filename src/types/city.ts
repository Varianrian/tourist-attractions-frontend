export interface City {
  id: string;
  name: string;
  type: string;
  center: {
    type: string;
    coordinates: number[];
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  provinceId: string;
  createdAt: string;
  updatedAt: string;
}
