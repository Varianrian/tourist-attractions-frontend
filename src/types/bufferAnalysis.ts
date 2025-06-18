export interface BufferAnalysis {
  data: {
    type: "FeatureCollection";
    features: [
      {
        type: "Feature";
        properties: {
          id: string;
          attraction_name: string;
          province: string;
          city: string;
          latitude: number;
          longitude: number;
          transportation_names: string[];
          transportation_count: number;
          is_reachable: boolean;
        };
        geometry: {
          type: "Polygon";
          coordinates: number[][][];
        };
      },
    ];
  };
  count: number;
}
