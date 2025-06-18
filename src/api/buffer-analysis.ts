import { useFetch } from "@/utils/reactQuery";
import { type Response } from "@/types/response";
import type { BufferAnalysis } from "@/types/bufferAnalysis";

export const apiRoutes = {
// {{api_url}}/analysis/reachable-attractions?bufferRadius=3000&provinceName=Jawa Barat

  getBufferAnalysis: "/analysis/reachable-attractions",
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

export const GetBufferAnalysis = (
  bufferRadius: number = 3000,
  provinceName: string = "JAWA TENGAH"
) => {
  return useFetch<Response<BufferAnalysis>>(
    apiRoutes.getBufferAnalysis,
    {
      bufferRadius,
      provinceName,
    },
    {
      enabled: !!provinceName,
    }
  );
}
