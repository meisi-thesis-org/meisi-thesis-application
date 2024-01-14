import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const isSessionExpired = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {

  const useSessionStore = useSession();
  const { session } = storeToRefs(useSessionStore);

  const isTokenExpired = (accessToken: string) => {
    const expiry = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  if (session.value === undefined) return next({ name: 'access-account' });
  const isTokenExpiredPreRefresh = isTokenExpired(session.value.accessToken);
  if (isTokenExpiredPreRefresh) await useSessionStore.refreshTokens();

  if (!session.value && to.meta.requiresSession === true) return next({ name: 'access-account' })
  if (session.value && to.meta.requiresSession === false) return next({ name: 'dashboard', params: { userUuid: session.value.userUuid} });

  return next();
}
