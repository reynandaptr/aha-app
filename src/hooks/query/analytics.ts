import { QueryOptions, ReactQueryCallback, useCustomQuery } from "@/utils/query";
import { UserAnalyticsResponse, UserOnlineAnalyticsResponse } from "@reynandaptr/aha-types/dist/types";

export const useAnalyticsUsers = (
  options?: QueryOptions,
  callback?: ReactQueryCallback<UserAnalyticsResponse[]>,
) => {
  return useCustomQuery<UserAnalyticsResponse[]>(
    ['v1', 'analytics', 'users'],
    {
      url: '/v1/analytics/users',
    },
    options,
    callback,
  );
};

export const useAnalyticsUsersOnline = (
  options?: QueryOptions,
  callback?: ReactQueryCallback<UserOnlineAnalyticsResponse>,
) => {
  return useCustomQuery<UserOnlineAnalyticsResponse>(
    ['v1', 'analytics', 'users', 'online'],
    {
      url: '/v1/analytics/users/online',
    },
    options,
    callback,
  );
};
