import { useSessionStore } from '@/store/use-session.store';
import { useFetch, type BeforeFetchContext } from '@vueuse/core';

type HttpMethod = 'GET' | 'POST' | 'PUT';

export const useHttpComposable = () => {
  const beforeFetch = (ctx: BeforeFetchContext) => {
    const { session } = useSessionStore();
    const token = ctx.url.includes('refresh-tokens') ? session.refreshToken : session.accessToken;
    ctx.options.headers = { ...ctx.options.headers, authorization: `Bearer ${token}` };
    return ctx;
  };

  const useFetchWrapper = async <T>(
    httpMethod: HttpMethod,
    httpPath: string,
    httpBody?: Record<string, unknown>,
    httpHeaders?: Record<string, string>) => {
    return await useFetch<T>('http://localhost:8000' + httpPath, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...httpHeaders
      },
      body: JSON.stringify(httpBody)
    }, { beforeFetch }).json();
  }

  const doRequest = async <T>(
    httpMethod: HttpMethod,
    httpPath: string,
    httpBody?: Record<string, unknown>,
    httpHeaders?: Record<string, string>
  ): Promise<T | undefined> => {
    const { data, statusCode } = await useFetchWrapper<T>(httpMethod, httpPath, httpBody, httpHeaders);

    if (statusCode.value === 401) {
      const { refreshSession } = useSessionStore();
      await refreshSession();
      await doRequest(httpMethod, httpPath, httpBody, httpHeaders);
    }

    return data.value ?? undefined;
  }

  return { doRequest }
}
