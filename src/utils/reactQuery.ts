import { api } from './api';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

type QueryKeyT = [string, object | undefined];

export const fetcher = <T>({ queryKey }: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return api.get<T>(url, params).then((res) => res.data);
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) return;

    queryClient.prefetchQuery<T>({
      queryKey: [url, params],
    });
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: Omit<UseQueryOptions<T, Error, T, QueryKeyT>, 'queryKey' | 'queryFn'>,
) => {
  const context = useQuery<T, Error, T, QueryKeyT>({
    queryFn: ({ queryKey, signal, meta, pageParam, client }: QueryFunctionContext<QueryKeyT>) =>
      fetcher({ queryKey, pageParam, signal, meta, client }),
    enabled: !!url,
    ...config,
    queryKey: [url!, params],
  });

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: func,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [url!, params] });

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (_, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [url!, params] });
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    url,
    params,
    updater,
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>((data) => api.post(url, data), url, params, updater);
};

export const usePut = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>((data) => api.patch(url, data), url, params, updater);
};
