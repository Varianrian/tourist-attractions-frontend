import { useFetch } from "@/utils/reactQuery";
import { api } from "@/utils/api";
import { type Response } from "@/types/response";
import { type Province } from "@/types/province";

export const apiRoutes = {
  getProvinceById: (id: string) => `/provinces/${id}`,
  getProvinceByName: (name: string) => `/provinces/name/${name}`,
};

// export const GetAllTransportationWithFilter = () => {
//   return useFetch<Response<{ transportations: Transportation[] }>>(
//     apiRoutes.getListTransportations,
//     {
//       select: "id,name,type,province,latitude,longitude",
//       province: "JAWA BARAT",
//       sortOrder: "ASC",
//     },
//     {
//       enabled: true,
//     }
//   );
// };

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
    }
  );
};
