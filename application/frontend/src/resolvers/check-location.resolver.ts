import { useNetworkStore } from '@/store/use-network.store';
import { useSessionStore } from '@/store/use-session.store';
import type { NavigationGuardNext, RouteNetworkNormalized } from 'vue-router';

export const CheckNetworkResolver = async (
  toRoute: Readonly<RouteNetworkNormalized>,
  _fromRoute: Readonly<RouteNetworkNormalized>,
  next: NavigationGuardNext
) => {
  const { findNetworkByUserUuid } = useNetworkStore();
  const { session, clearSession } = useSessionStore();

  if (session.userUuid === '') {
    clearSession();
    return next({ path: '/sign-in' })
  }

  toRoute.meta.network = await findNetworkByUserUuid(session.userUuid);

  return next();
}
