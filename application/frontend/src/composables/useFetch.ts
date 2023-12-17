import { useSession } from "@/stores/useSession";
import type { Primitive } from "@/types/Primitive";
import axios from "axios";
import { useRouter } from "vue-router";

export const useFetch = () => {
  const router = useRouter();

  const axiosClient = axios.create({ baseURL: "http://localhost:8000/" });

  const defineRequestInterceptors = (token: "accessToken" | "refreshToken") => {
    axiosClient.interceptors.request.use(
      (config) => {
        const { session } = useSession()
        if (session && session[token] !== undefined) config.headers.Authorization = `Bearer ${session[token]}`;
        return config;
      },
      (error) => Promise.reject(error)
    )
  }

  const defineResponseInterceptors = () => {
    axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { session, refreshTokens } = useSession();
            defineRequestInterceptors('refreshToken')
            await refreshTokens()
            defineRequestInterceptors('accessToken')
            originalRequest.headers.Authorization = `Bearer ${session?.accessToken}`
            return axios(originalRequest);
          } catch (error) {
            console.log(error)
            return router.push("/access-account")
          }
        }

        return Promise.reject(error);
      }
    )
  }

  defineRequestInterceptors("accessToken")
  defineResponseInterceptors()
  
  const createRequest = async <T>(
    resourceURL: string,
    method: 'GET' | 'POST' | 'PUT',
    data: Record<string, Primitive> | undefined = undefined
  ) => {
    return await axiosClient(resourceURL, { method, data })
  }

  return { createRequest };
};
