import { storeToRefs } from 'pinia';
import { useSettingStore } from './../store/use-setting.store';

const useLocaleComposable = () => {
  const state = storeToRefs(useSettingStore());

  return { getLocale: () => state.setting.value.locale }
};

export { useLocaleComposable }
