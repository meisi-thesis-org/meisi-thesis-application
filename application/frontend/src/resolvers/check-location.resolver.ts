import { useLocationStore } from '@/store/use-location.store';
import { useSessionStore } from '@/store/use-session.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const CheckLocationResolver = async (
  toRoute: Readonly<RouteLocationNormalized>,
  _fromRoute: Readonly<RouteLocationNormalized>,
  next: NavigationGuardNext
) => {
  const { findLocationByUserUuid } = useLocationStore();
  const { session, clearSession } = useSessionStore();

  if (session.userUuid === '') {
    clearSession();
    return next({ path: '/sign-in' })
  }

  toRoute.meta.location = await findLocationByUserUuid(session.userUuid);

  return next();
}
