import { useFetch } from "@/utils/reactQuery";
import { type Transportation } from "@/types/transportation";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getListTransportations: "/transportation/filter",
};

export const GetAllTransportationWithFilter = (
  province: string = "JAWA TENGAH",
  type: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  } = {
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  }
) => {
  const typeCommaSeparated = Object.entries(type)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(",");

  return useFetch<Response<{ transportations: Transportation[] }>>(
    apiRoutes.getListTransportations,
    {
      select: "id,name,type,province,latitude,longitude",
      sortOrder: "ASC",
      province,
      type: typeCommaSeparated,
    },
    {
      enabled: true,
    }
  );
};

// export const PaketById = (id: string) => {
//   return useFetch<PaketConfig>(apiRoutes.getPaketById(id), undefined, {
//     enabled: !!id,
//   });
// };

// export const CreatePaket = (data: PaketConfig) => {
//   return api.post<PaketConfig>(apiRoutes.createPaket, data);
// };

// export const DeletePaket = (id: string) => {
//   return api.delete<PaketConfig>(apiRoutes.deletePaket(id));
// };

// export const UpdatePaket = (id: string, data: PaketConfig) => {
//   return api.patch<PaketConfig>(apiRoutes.updatePaketById(id), data);
// };
