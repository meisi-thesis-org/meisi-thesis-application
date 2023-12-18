import { useAuthentication } from '@/composables/useAuthentication';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const useAuthenticationResolver = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { isAuthenticated } = useAuthentication()

  if (isAuthenticated() === false && to.meta.requiresSession === true) return next({ name: 'access-account' });
  if (isAuthenticated() === true && to.meta.requiresSession === false) return next({ name: 'dashboard' });

  return next();
}
