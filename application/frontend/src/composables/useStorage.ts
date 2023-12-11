export const useStorage = () => {
  const fetch = (name: string) => JSON.parse(localStorage.getItem(name) ?? '');
  const save = <T>(name: string, data: T) => localStorage.setItem(name, JSON.stringify(data));
  const remove = (name: string) => localStorage.removeItem(name);
  const clear = () => localStorage.clear();

  return { fetch, save, remove, clear }
}
