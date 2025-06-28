import { useFetch } from "@/utils/reactQuery";
import { api } from "@/utils/api";
import { type Transportation } from "@/types/transportation";
import { type Response } from "@/types/response";

export const apiRoutes = {
  getListTransportations: "/transportation/filter",
  getAllTransportationsPaginated: "/transportation/paginated",
  createTransportation: "/transportation",
  getTransportationById: (id: string) => `/transportation/${id}`,
  updateTransportation: (id: string) => `/transportation/${id}`,
  deleteTransportation: (id: string) => `/transportation/${id}`,
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

export const GetAllTransportationsPaginated = (
  page: number = 1,
  limit: number = 10,
  sortBy: string = "createdAt",
  sortOrder: "ASC" | "DESC" = "ASC",
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
  },
  search?: string
) => {
  const typeCommaSeparated = Object.entries(type)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(",");

  return useFetch<
    Response<{
      transportations: Transportation[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  >(
    apiRoutes.getAllTransportationsPaginated,
    {
      page,
      limit,
      sortBy,
      sortOrder,
      province,
      type: typeCommaSeparated,
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

// Transportation CRUD operations
export const CreateTransportation = (data: Partial<Transportation>) => {
  return api.post<Response<Transportation>>(
    apiRoutes.createTransportation,
    data
  );
};

export const GetTransportationById = (id: string) => {
  return useFetch<Response<Transportation>>(
    apiRoutes.getTransportationById(id),
    undefined,
    {
      enabled: !!id,
    }
  );
};

export const UpdateTransportation = (
  id: string,
  data: Partial<Transportation>
) => {
  return api.patch<Response<Transportation>>(
    apiRoutes.updateTransportation(id),
    data
  );
};

export const DeleteTransportation = (id: string) => {
  return api.delete<Response<null>>(apiRoutes.deleteTransportation(id));
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
