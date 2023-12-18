import { useDevice } from '@/stores/useDevice';
import { useSession } from '@/stores/useSession';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const useAuthenticationResolver = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { session } = useSession();
  const { devices, findDevicesByUserUuid } = useDevice();
  await findDevicesByUserUuid(session.userUuid);
  const hasDevice = devices?.find((device) => device.userAgent === navigator.userAgent);
  if (hasDevice !== undefined) return next({ name: 'check-network' });
  return next();
}
