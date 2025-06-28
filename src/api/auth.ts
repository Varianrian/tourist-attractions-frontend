// import { useFetch } from "@/utils/reactQuery";
import type { User, LoginUser } from "@/types/user";
import { api } from "@/utils/api";
import { type Response } from "@/types/response";

export const apiRoutes = {
  login: "/auth/login",
  profile: "/auth/profile",
};

export const login = (data: LoginUser) => {
  return api.post<Response<{ access_token: string }>>(
    apiRoutes.login,
    data
  );
};

export const getProfile = () => {
  return api.get<Response<User>>(apiRoutes.profile);
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
