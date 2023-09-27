import { ref } from 'vue';

type Theme = 'light' | 'dark';

const state = ref<Theme>('light');

const useThemeComposable = () => ({
  getTheme: () => state.value,
  setTheme: (args: Theme) => { state.value = args }
});

export { useThemeComposable }
