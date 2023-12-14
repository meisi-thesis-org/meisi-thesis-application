export const useLocalStorage = () => ({
  fetch: <T>(designation: string): T => JSON.parse(localStorage.getItem(designation) ?? ''),
  save: <T>(designation: string, data: T) => localStorage.setItem(designation, JSON.stringify(data)),
  remove: (designation: string) => localStorage.removeItem(designation),
  clear: () => localStorage.clear()
})
