import { useSessionStore } from '@/store/use-session.store';
import { storeToRefs } from 'pinia';

export const useAuthenticationComposable = () => {
  const { session } = storeToRefs(useSessionStore());

  const isTokenExpired = (token: string): boolean => {
    const tokenExpiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= tokenExpiry;
  };

  const isAuthenticated = (): boolean => {
    const anyEmptyAttribute = Object.values(session.value).every((attribute) => attribute === '');
    if (anyEmptyAttribute) return false;

    const isAccessTokenExpired: boolean = isTokenExpired(session.value.accessToken);
    const isRefreshTokenExpired: boolean = isTokenExpired(session.value.refreshToken);
    if (isAccessTokenExpired && isRefreshTokenExpired) return false;

    return true;
  };

  return { isAuthenticated };
};
