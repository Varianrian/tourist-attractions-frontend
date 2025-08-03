import { useFetch } from "@/utils/reactQuery";
import { type Response } from "@/types/response";
import type { City } from "@/types/city";

export const apiRoutes = {
  getCityById: (id: string) => `/cities/${id}`,
  getCityByProvinceId: (provinceId: string) => `/cities/province/${provinceId}`,
};

export const GetCityById = (
  id: string | null
) => {
  return useFetch<Response<City>>(
    apiRoutes.getCityById(id!),
    undefined,
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const GetCityByProvinceId = (
  provinceId: string = "0565566a-c155-4ca9-a586-60c4aa53a5cc",
  select: string[] = ["type"]
) => {
  return useFetch<Response<Partial<City>[]>>(
    apiRoutes.getCityByProvinceId(provinceId),
    { select: select.join(",") },
    {
      enabled: !!provinceId,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};
