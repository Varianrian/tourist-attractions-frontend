import axiosInstance from '../utils/api';
import type { DashboardResponse } from '../types/dashboard';

export const dashboardApi = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>('/dashboard');
    return response.data;
  },
};
