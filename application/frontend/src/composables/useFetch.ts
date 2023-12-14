export const useFetch = () => {
  const createRequest = async <T> (
    resourceURL: string,
    method: 'GET' | 'POST' | 'PUT',
    body: Record<string, T> = {}
  ) => {
    return await fetch(resourceURL, { body: JSON.stringify(body) })
  }

  return { createRequest };
};
