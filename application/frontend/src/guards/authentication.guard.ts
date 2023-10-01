import { useAuthenticationComposable } from '@/composables/use-authentication.composable';
import { useLocalRouterComposable } from '@/composables/use-local-router.composable';
import { useSessionStore } from '@/store/use-session.store';
import type { OpenRoute } from '@/types/collections';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const AuthenticationGuard = (
  toRoute: Readonly<RouteLocationNormalized>,
  _fromRoute: Readonly<RouteLocationNormalized>,
  next: NavigationGuardNext
) => {
  const { clearSession } = useSessionStore();
  const { isAuthenticated } = useAuthenticationComposable();
  const { isOpenRoute } = useLocalRouterComposable();

  if (isAuthenticated() === true) {
    if (isOpenRoute(toRoute.path as OpenRoute) === true) return next({ path: '/dashboard' });
    return next();
  }

  if (isOpenRoute(toRoute.path as OpenRoute) === true) return next();

  clearSession();
  return next({ path: '/sign-in' })
}
