import type { StorageService } from '@/services/storage.service'
import type { Locale } from '@/types/collections.type'
import { inject, ref } from 'vue'

type UseLocaleSignature = {
  fetchLocale: () => Locale
  updateLocale: (nextLocale: Locale) => void
}

export const useLocale = (): UseLocaleSignature => {
  const storageService = inject<StorageService>('storageService');
  const locale = ref<Locale>(storageService?.fetchToken('LOCALE') ?? 'EN')

  const fetchLocale = (): Locale => locale.value
  const updateLocale = (nextLocale: Locale): void => {
    locale.value = nextLocale
    storageService?.saveToken('LOCALE', nextLocale);
  }

  return { fetchLocale, updateLocale }
}
