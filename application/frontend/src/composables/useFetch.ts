export const useFetch = () => {
  const createRequest = async (
    resourceURL: string,
    httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
    httpBody: Record<string, string> | undefined = undefined,
    httpHeaders: Record<string, string> | undefined = undefined
  ) => await fetch(resourceURL, {
    method: httpMethod,
    headers: httpHeaders,
    body: JSON.stringify(httpBody)
  });

  return { createRequest };
}
