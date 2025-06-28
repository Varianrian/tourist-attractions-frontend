import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboard';
import type { DashboardData } from '@/types/dashboard';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await dashboardApi.getDashboard();
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export type { DashboardData };
