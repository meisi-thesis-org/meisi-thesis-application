import { useSession } from '@/stores/useSession';
import type { Primitive } from '@/types/Primitive';
import axios from 'axios';
import { storeToRefs } from 'pinia';

export const useFetch = () => {
  const axiosClient = axios.create({ baseURL: 'http://localhost:8000/' });

  axiosClient.interceptors.request.use(
    (config) => {
      const { session } = storeToRefs(useSession())
      if (session.value === undefined) return config;
      const token = config.url !== undefined && !config.url.includes('refresh-tokens') ? session.value.accessToken : session.value.refreshToken;
      if (token !== undefined) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    async (error) => await Promise.reject(error)
  )

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && originalRequest._retry === undefined) {
        originalRequest._retry = true;
        const { refreshTokens } = useSession();
        const isRefreshRequest = (originalRequest.url as string).includes('refresh-tokens');
        if (!isRefreshRequest) await refreshTokens();
        return await axios(originalRequest);
      }

      throw error;
    }
  )

  const createRequest = async <T>(
    resourceURL: string,
    method: 'GET' | 'POST' | 'PUT',
    data: Record<string, Primitive> | undefined = undefined,
    params: Record<string, Primitive> | undefined = undefined
  ) => {
    return await axiosClient<T>(resourceURL, { method, data, params })
  }

  return { createRequest };
};
