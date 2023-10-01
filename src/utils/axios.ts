import { getApiURL } from '@/constants';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: getApiURL(),
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export function request<Res = any>(
  config: AxiosRequestConfig,
): AxiosPromise<Res> {
  client.interceptors.response.use(
    resp => {
      return Promise.resolve(resp);
    },
    err => {
      return Promise.reject(err);
    },
  );

  return client(config);
}
