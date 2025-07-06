import { useFetch } from "@/utils/reactQuery";
import { api } from "@/utils/api";
import { type Attraction } from "@/types/attraction";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getAllAttractionsPaginated: "/tourist-attraction/paginated",
  createAttraction: "/tourist-attraction",
  getAttractionById: (id: string) => `/tourist-attraction/${id}`,
  updateAttraction: (id: string) => `/tourist-attraction/${id}`,
  deleteAttraction: (id: string) => `/tourist-attraction/${id}`,

  exportAllAttractions: "/tourist-attraction/export-excel",
  importExampleAttractions: "/tourist-attraction/import-example",
  importAttractions: "/tourist-attraction/import",
};

export const GetAllAttractionsPaginated = (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "createdAt",
  sortOrder: "ASC" | "DESC" = "DESC",
  province: string = "",
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

// Attraction CRUD operations
export const CreateAttraction = (data: Partial<Attraction>) => {
  return api.post<Response<Attraction>>(
    apiRoutes.createAttraction,
    data
  );
};

export const GetAttractionById = (id: string) => {
  return useFetch<Response<Attraction>>(
    apiRoutes.getAttractionById(id),
    undefined,
    {
      enabled: !!id,
    }
  );
};

export const UpdateAttraction = (
  id: string,
  data: Partial<Attraction>
) => {
  return api.patch<Response<Attraction>>(
    apiRoutes.updateAttraction(id),
    data
  );
};

export const DeleteAttraction = (id: string) => {
  return api.delete<Response<null>>(apiRoutes.deleteAttraction(id));
};

// Import/Export operations
export const ExportAllAttractions = () => {
  return api.get(apiRoutes.exportAllAttractions, {}, {
    responseType: "blob",
  });
};

export const ImportExampleAttractions = () => {
  return api.get(apiRoutes.importExampleAttractions, {}, {
    responseType: "blob",
  });
};

export const ImportAttractions = (formData: FormData) => {
  return api.post(apiRoutes.importAttractions, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
};
