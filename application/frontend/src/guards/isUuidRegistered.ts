import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const isUuidRegistered = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useSessionStore = useSession();
  const { session } = storeToRefs(useSessionStore);

  if(to.meta.requiresSession !== true) {
    return next();
  }

  if(session.value === undefined) return next({ name: "access-account" });
  if(session.value.userUuid !== to.params.userUuid) return next({ name: to.name?.toString(), params: { userUuid: session.value?.userUuid }, replace: true });
  return next();
}
