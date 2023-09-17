type HttpMethod = 'GET' | 'POST' | 'PUT';

type UseHttpSignature = {
  readonly doRequest: <T>(
    httpMethod: HttpMethod,
    httpPath: string,
    httpBody?: Record<string, unknown>,
    httpHeaders?: Record<string, string>
  ) => Promise<T>
}

export const useHttp = (): UseHttpSignature => {
  const doRequest = async <T>(
    httpMethod: HttpMethod,
    httpPath: string,
    httpBody?: Record<string, unknown>,
    httpHeaders?: Record<string, string>
  ): Promise<T> => {
    const response = await fetch('http://localhost:8000' + httpPath, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...httpHeaders
      },
      body: JSON.stringify(httpBody)
    });

    return await response.json();
  }

  return { doRequest }
}
