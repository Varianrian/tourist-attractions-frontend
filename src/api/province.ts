import { useFetch } from "@/utils/reactQuery";
import { type Province } from "@/types/province";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getAllProvinces: () => `/provinces`,
  getProvinceById: (id: string) => `/provinces/${id}`,
  getProvinceByName: (name: string) => `/provinces/name/${name}`,
};

export const GetAllProvinces = (select: string[] = ["name"]) => {
  return useFetch<Response<Partial<Province>[]>>(
    apiRoutes.getAllProvinces(),
    { select: select.join(",") },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const GetProvinceById = (
  id: string = "0565566a-c155-4ca9-a586-60c4aa53a5cc"
) => {
  return useFetch<Province>(
    apiRoutes.getProvinceById(id),
    undefined,
    {
      enabled: !!id,
    }
  );
};

export const GetProvinceByName = (
  name: string = "JAWA TENGAH"
) => {
  return useFetch<Province>(
    apiRoutes.getProvinceByName(name),
    undefined,
    {
      enabled: !!name,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};
