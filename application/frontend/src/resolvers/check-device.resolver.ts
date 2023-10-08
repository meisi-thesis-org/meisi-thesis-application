import { useDeviceStore } from '@/store/use-device.store';
import { useSessionStore } from '@/store/use-session.store';
import type { NavigationGuardNext, RouteNetworkNormalized } from 'vue-router';

export const CheckDeviceResolver = async (
  toRoute: Readonly<RouteNetworkNormalized>,
  _fromRoute: Readonly<RouteNetworkNormalized>,
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
