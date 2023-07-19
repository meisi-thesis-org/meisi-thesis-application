import { defineStore } from 'pinia';
import { ref } from 'vue';

enum ThemeCollection {
  DARK_THEME = 'dark-theme',
  LIGHT_THEME = 'light-theme'
}

export const useThemeStore = defineStore('useThemeStore', () => {
  const theme = ref(ThemeCollection.LIGHT_THEME);

  /** Getters */
  const isDarkTheme = (): boolean => theme.value === ThemeCollection.DARK_THEME;
  const isLightTheme = (): boolean => theme.value === ThemeCollection.LIGHT_THEME;

  /** Methods */
  const updateTheme = (): void => {
    const collectionThemes = Object.values(ThemeCollection);
    const updateToTheme = collectionThemes.find((collectionTheme) => collectionTheme !== theme.value);
    theme.value = updateToTheme ?? ThemeCollection.DARK_THEME;
  }

  return {
    theme,
    isDarkTheme,
    isLightTheme,
    updateTheme
  }
})
