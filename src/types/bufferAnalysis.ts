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
          latitude: number;
          longitude: number;
          transportations: {
            name: string;
            type: string;
          }[];
          transportation_count: number;
          is_reachable: boolean;
        };
        geometry: {
          type: "Polygon";
          coordinates: number[][][];
        };
      },
    ];
    metadata: {
      totalAttractions: number;
      reachableAttractions: number;
      unreachableAttractions: number;
      bufferRadiusMeters: number;
      filters: {
        transportationType: string;
        provinceName: string;
      };
    };
  };
  count: number;
}
