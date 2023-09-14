import type { StorageService } from '@/services/storage.service'
import type { Theme } from '@/types/collections.type'
import { inject, ref } from 'vue'

type UseThemeSignature = {
  fetchTheme: () => Theme
  updateTheme: () => void
}

export const useTheme = (): UseThemeSignature => {
  const storageService = inject<StorageService>('storageService');
  const theme = ref<Theme>(storageService?.fetchToken('THEME') ?? 'LIGHT_THEME');

  return {
    fetchTheme: () => theme.value,
    updateTheme: () => {
      const availableThemes = new Array<Theme>('DARK_THEME', 'LIGHT_THEME');
      const themeToUpdate = availableThemes.find((foundTheme) => foundTheme !== theme.value);
      theme.value = themeToUpdate ?? 'DARK_THEME';
      storageService?.saveToken('THEME', themeToUpdate ?? 'DARK_THEME');

      console.log(themeToUpdate ?? 'DARK_THEME')
    }
  }
}
