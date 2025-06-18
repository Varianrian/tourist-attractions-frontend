import { useFetch } from "@/utils/reactQuery";
import { api } from "@/utils/api";
import { type Transportation } from "@/types/transportation";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getListTransportations: "/transportation/filter",
};

export const GetAllTransportationWithFilter = (province: string = "JAWA TENGAH") => {
  return useFetch<Response<{ transportations: Transportation[] }>>(
    apiRoutes.getListTransportations,
    {
      select: "id,name,type,province,latitude,longitude",
      sortOrder: "ASC",
      province,
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
