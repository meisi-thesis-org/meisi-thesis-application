import { describe, expect, it } from 'vitest';
import { useSpinnerComposable } from './use-spinner.composable';

describe('UseSpinnerComposable', () => {
  const { state, updateState } = useSpinnerComposable();

  it('should have a default state', () => {
    expect(state.value).toBe(false)
  })

  describe('updateState', () => {
    it('should change state to true', () => {
      updateState();

      expect(state.value).toBe(true)
    })
  })
})
