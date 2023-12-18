import { useAuthentication } from '@/composables/useAuthentication';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const useAuthenticationResolver = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { isSessionExpired } = useAuthentication()
  const isExpired = await isSessionExpired()

  if (isExpired === true && to.meta.requiresSession === true) return next({ name: 'access-account' });
  if (isExpired === false && to.meta.requiresSession === false) return next({ name: 'dashboard' });

  return next();
}
