import { describe, expect, it } from 'vitest';
import { useThemeComposable } from './use-theme.composable';

describe('UseThemeComposable', () => {
  const composable = useThemeComposable();

  it('should have a dark theme', () => {
    composable.setTheme('dark')
    expect(composable.getTheme()).toBe('dark')
  })

  it('should have a light theme', () => {
    composable.setTheme('light')
    expect(composable.getTheme()).toBe('light')
  })
})
