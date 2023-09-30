import { useMutation, useQuery } from '@tanstack/react-query';

import { request } from './axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseResponse } from '@reynandaptr/aha-types/dist';

export type ReactQueryCallback<Res = any> = {
  onSuccess?:
    | ((
        _data: AxiosResponse<BaseResponse<Res>, any>,
        _variables?: void,
        _context?: unknown,
      ) => unknown)
    | undefined;
  onError?:
    | ((
        _error: AxiosError<BaseResponse<any>, any>,
        _variables?: void,
        _context?: unknown,
      ) => unknown)
    | undefined;
};

export type QueryOptions = {
  retry?: boolean;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
};

export function useCustomMutation<Req = any, Res = any>(
  axiosRequestConfig: AxiosRequestConfig,
  options?: QueryOptions,
) {
  return useMutation<
    AxiosResponse<BaseResponse<Res>>,
    AxiosError<BaseResponse>,
    Req
  >(data => {
    return request<BaseResponse<Res>>({
      ...axiosRequestConfig,
      data,
    });
  }, options);
}

export function useCustomQuery<Res = any>(
  queryKey: string[],
  axiosRequestConfig: AxiosRequestConfig,
  options?: QueryOptions,
  callback?: ReactQueryCallback<Res>,
) {
  return useQuery<AxiosResponse<BaseResponse<Res>>, AxiosError<BaseResponse>>(
    queryKey,
    () => request<BaseResponse<Res>>(axiosRequestConfig),
    {
      onSuccess: d => {
        if (callback?.onSuccess) {
          callback.onSuccess(d);
        }
      },
      onError: e => {
        if (callback?.onError) {
          callback.onError(e);
        }
      },
      ...options,
    },
  );
}
