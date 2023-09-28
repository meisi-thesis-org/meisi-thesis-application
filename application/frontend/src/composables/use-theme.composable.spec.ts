import { describe, expect, it } from 'vitest';
import { useThemeComposable } from './use-theme.composable';

describe('UseThemeComposable', () => {
  const composable = useThemeComposable();

  it('should have a dark theme', () => {
    expect(composable.getTheme()).toBe('dark')
  })
})
