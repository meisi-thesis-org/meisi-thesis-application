import { useSession } from '@/stores/useSession';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const isSessionExpired = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { session, refreshTokens } = useSession();

  if (session.accessToken === undefined) return next({ name: 'access-account' });

  const isTokenExpired = (accessToken: string) => {
    const expiry = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  const isTokenExpiredPreRefresh = isTokenExpired(session.accessToken);
  if (isTokenExpiredPreRefresh) await refreshTokens();

  const isTokenExpiredAfterRefresh = isTokenExpired(session.accessToken);

  /**
   * Acts when there's no session
   */
  if (isTokenExpiredAfterRefresh && to.meta.requiresSession === true) {
    return next({ name: 'access-account' });
  }

  /**
   * Acts when there's a session but a page doesn't require session
   */
  if (!isTokenExpiredAfterRefresh && to.meta.requiresSession === false) {
    return next({ name: 'dashboard' }); ;
  }

  /**
   * Redirects normal traffic
   */
  return next();
}
