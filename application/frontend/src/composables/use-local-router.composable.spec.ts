import { describe, expect, it } from 'vitest';
import { useLocalRouterComposable } from './use-local-router.composable';

describe('useLocalRouterComposable', () => {
  const { isOpenRoute, isClosedRoute } = useLocalRouterComposable();

  describe('isOpenRoute', () => {
    it('should be true because provided route is an openRoute', () => {
      expect(isOpenRoute('/sign-in')).toBe(true);
    })

    it('should be false because provided route is non openRoute', () => {
      expect(isOpenRoute('/dummyOpenRoute' as any)).toBe(false);
    })
  })

  describe('isClosedRoute', () => {
    it('should be true because provided route is a closedRoute', () => {
      expect(isClosedRoute('/dashboard')).toBe(true);
    })

    it('should be false because provided route is non closedRoute', () => {
      expect(isClosedRoute('/dummyOpenRoute' as any)).toBe(false);
    })
  })
})
