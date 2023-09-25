type HttpMethod = 'GET' | 'POST' | 'PUT';

export const useHttp = () => {
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
