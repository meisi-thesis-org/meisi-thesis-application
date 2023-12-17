export const useLocalStorage = () => ({
  fetch: <T>(designation: string): T => { const data = localStorage.getItem(designation); return data ? JSON.parse(data) : null},
  save: <T>(designation: string, data: T) => localStorage.setItem(designation, JSON.stringify(data)),
  remove: (designation: string) => localStorage.removeItem(designation),
  clear: () => localStorage.clear()
})
