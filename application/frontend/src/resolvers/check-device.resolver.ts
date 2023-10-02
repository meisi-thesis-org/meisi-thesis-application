import { useDeviceStore } from '@/store/use-device.store';
import { useSessionStore } from '@/store/use-session.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const CheckDeviceResolver = async (
  toRoute: Readonly<RouteLocationNormalized>,
  _fromRoute: Readonly<RouteLocationNormalized>,
  next: NavigationGuardNext
) => {
  const { findDeviceByUserUuid } = useDeviceStore();
  const { session, clearSession } = useSessionStore();

  if (session.userUuid === '') {
    clearSession();
    return next({ path: '/sign-in' })
  }

  toRoute.meta.device = await findDeviceByUserUuid(session.userUuid);

  return next();
}
