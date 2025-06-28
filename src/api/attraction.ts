import { useFetch } from "@/utils/reactQuery";
import { type Attraction } from "@/types/attraction";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getAllAttractionsPaginated: "/tourist-attraction/paginated",
};

export const GetAllAttractionsPaginated = (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "createdAt",
  sortOrder: "ASC" | "DESC" = "DESC",
  province: string = "JAWA TENGAH",
  search?: string
) => {
  return useFetch<
    Response<{
      tourist_attractions: Attraction[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  >(
    apiRoutes.getAllAttractionsPaginated,
    {
      page,
      limit,
      sortBy,
      sortOrder,
      province,
      search,
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
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
