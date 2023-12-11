import type { Theme } from '@/types/Theme'
import { ref } from 'vue'

export const useTheme = () => {
  const state = ref<Theme>('LIGHT_THEME')

  return {
    theme: state,
    isDarkTheme: state.value === 'DARK_THEME',
    isLightTheme: state.value === 'LIGHT_THEME',
    updateTheme: (theme: Theme) => { state.value = theme }
  }
}
