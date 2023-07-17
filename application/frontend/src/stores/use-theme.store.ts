import { ThemeCollection } from '@/shared/collections/theme.collection';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: ThemeCollection.LIGHT
  }),
  getters: {
    isDarkTheme: (state) => state.theme === ThemeCollection.DARK,
    isLightTheme: (state) => state.theme === ThemeCollection.LIGHT
  },
  actions: {
    updateTheme() {
      const themeToUpdate = Object.values(ThemeCollection).find((theme) => theme !== this.theme);
      this.theme = themeToUpdate ?? ThemeCollection.LIGHT;
    }
  }
})
