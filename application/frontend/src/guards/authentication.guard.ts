import { useSessionStore } from '@/store/use-session.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const AuthenticationGuard = (
  to: Readonly<RouteLocationNormalized>,
  from: Readonly<RouteLocationNormalized>,
  next: NavigationGuardNext
) => {
  const { session, clearSession } = useSessionStore();
  const { userUuid, accessToken, refreshToken } = session;

  if (userUuid === '' || accessToken === '' || refreshToken === '') next({ path: '/sign-in' });

  const base64Url = accessToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('ascii').split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  const parsedPayload = JSON.parse(jsonPayload);

  if (parsedPayload.exp < Date.now() / 1000) {
    clearSession();
    next({ path: '/sign-in' });
  }

  return next({ path: to.path });
}
