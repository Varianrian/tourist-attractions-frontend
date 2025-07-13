import { useFetch } from "@/utils/reactQuery";
import { type Response } from "@/types/response";
import type { BufferAnalysis } from "@/types/bufferAnalysis";

export const apiRoutes = {
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
  provinceName: string = "",
  transportationType: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  } = {
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  },
  withGeometry: boolean = true
) => {
  const typeCommaSeparated = Object.entries(transportationType)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(",");
  return useFetch<Response<BufferAnalysis>>(
    apiRoutes.getBufferAnalysis,
    {
      bufferRadius,
      provinceName,
      transportationType: typeCommaSeparated,
      withGeometry,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );
}
