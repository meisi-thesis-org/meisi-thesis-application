export const useFetch = () => {
  const createRequest = async <T>(
    resourceURL: string,
    method: 'GET' | 'POST' | 'PUT',
    body: Record<string, T> | undefined = undefined
  ) => {
    return await fetch(resourceURL, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  }

  return { createRequest };
};
