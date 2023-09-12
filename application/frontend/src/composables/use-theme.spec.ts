import { describe, expect, it } from 'vitest';
import { useTheme } from './use-theme';

describe('UseTheme', () => {
  const { fetchTheme, updateTheme } = useTheme();

  describe('fetchTheme', () => {
    it('should have a LIGHT_THEME', () => {
      expect(fetchTheme()).toEqual('LIGHT_THEME');
    })
  })

  describe('updateTheme', () => {
    it('should update theme to DARK_THEME', () => {
      updateTheme('DARK_THEME');
      expect(fetchTheme()).toEqual('DARK_THEME');
    })
  })
})
