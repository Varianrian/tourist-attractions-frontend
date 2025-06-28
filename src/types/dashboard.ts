export interface DashboardOverview {
  totals: {
    attractions: number;
    transportation: number;
    provinces: number;
  };
}

export interface ProvinceCount {
  province: string;
  count: string;
}

export interface TransportationTypeCount {
  type: string;
  count: string;
}

export interface DashboardGeographic {
  attractionsByProvince: ProvinceCount[];
  transportationByProvince: ProvinceCount[];
  transportationByType: TransportationTypeCount[];
}

export interface DashboardMetadata {
  generatedAt: string;
  dateRange: string;
}

export interface DashboardData {
  overview: DashboardOverview;
  geographic: DashboardGeographic;
  metadata: DashboardMetadata;
}

export interface DashboardResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    data: DashboardData;
    message: string;
  };
}
