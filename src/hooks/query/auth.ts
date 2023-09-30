import { QueryOptions, ReactQueryCallback, useCustomQuery } from "@/utils/query";

import {ValidateUserResponse} from '@reynandaptr/aha-types/dist';

export const useAuthValidateToken = (
  options?: QueryOptions,
  callback?: ReactQueryCallback<ValidateUserResponse>,
) => {
  return useCustomQuery<ValidateUserResponse>(
    ['v1', 'auth', 'validate-token'],
    {
      url: '/v1/auth/validate-token',
    },
    options,
    callback,
  );
};

export const useAuthRedirect = (
  loginProvider: string,
  query: string,
  options?: QueryOptions,
  callback?: ReactQueryCallback<ValidateUserResponse>,
) => {
  return useCustomQuery<ValidateUserResponse>(
    ['v1', 'auth', 'redirect', loginProvider.toLowerCase()],
    {
      url: `/v1/auth/redirect/${loginProvider.toLowerCase()}${query}`,
    },
    options,
    callback,
  );
}

export const useAuthLogout = (
  options?: QueryOptions,
  callback?: ReactQueryCallback,
) => {
  return useCustomQuery(
    ['v1', 'auth', 'logout'],
    {
      url: '/v1/auth/logout',
    },
    options,
    callback,
  );
}
