import { describe, expect, it } from 'vitest';
import { useLocaleComposable } from './use-locale.composable';

describe('UseLocaleComposable', () => {
  const composable = useLocaleComposable();

  it('should have an en locale', () => {
    expect(composable.getLocale()).toBe('EN')
  })
})
