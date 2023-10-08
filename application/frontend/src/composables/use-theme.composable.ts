import { storeToRefs } from 'pinia';
import { useSettingStore } from './../store/use-setting.store';

const useThemeComposable = () => {
  const state = storeToRefs(useSettingStore());

  return { getTheme: () => state.setting.value.theme }
};

export { useThemeComposable }