import type { StorageService } from '@/services/storage.service'
import type { Theme } from '@/types/collections.type'
import { inject, ref } from 'vue'

type UseThemeSignature = {
  fetchTheme: () => Theme
  updateTheme: (nextTheme: Theme) => void
}

export const useTheme = (): UseThemeSignature => {
  const storageService = inject<StorageService>('storageService');
  const theme = ref<Theme>(storageService?.fetchToken('THEME') ?? 'LIGHT_THEME')

  const fetchTheme = (): Theme => theme.value
  const updateTheme = (nextTheme: Theme): void => {
    theme.value = nextTheme
    storageService?.saveToken('THEME', nextTheme);
  }

  return { fetchTheme, updateTheme }
}
