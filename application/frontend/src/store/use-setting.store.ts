import type { Locale, Theme } from '@/types/collections';
import type { UserSettingEntity } from '@/types/entities';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    setting: useStorage<UserSettingEntity>('setting', {
      theme: 'DARK',
      locale: 'EN'
    })
  }),
  actions: {
    setTheme (theme: Theme): void {
      this.setting.theme = theme;
    },
    setLocale (locale: Locale): void {
      this.setting.locale = locale;
    }
  }
});
