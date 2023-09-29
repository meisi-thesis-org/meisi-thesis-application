import type { ClosedRoute, OpenRoute } from '@/types/collections';

export const useLocalRouterComposable = () => {
  const openRoutes = new Array<OpenRoute>('/sign-in', '/sign-up', '/refresh-access-code');
  const closedRoutes = new Array<ClosedRoute>('/dashboard');

  const isOpenRoute = (route: OpenRoute) => openRoutes.includes(route);
  const isClosedRoute = (route: ClosedRoute) => closedRoutes.includes(route);

  return { isOpenRoute, isClosedRoute }
}
