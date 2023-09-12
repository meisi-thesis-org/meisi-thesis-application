import { describe, expect, it } from 'vitest';
import { useLocale } from './use-locale';

describe('UseLocale', () => {
  const { fetchLocale, updateLocale } = useLocale();

  describe('fetchLocale', () => {
    it('should have locale to equal EN', () => {
      expect(fetchLocale()).toEqual('EN');
    })
  })
  describe('updateLocale', () => {
    it('should update theme to equal PT', () => {
      updateLocale('PT');
      expect(fetchLocale()).toEqual('PT');
    })
  })
})
