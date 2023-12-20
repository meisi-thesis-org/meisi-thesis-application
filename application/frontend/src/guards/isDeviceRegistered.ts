import { useDevice } from '@/stores/useDevice';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isDeviceRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { devices, findDevicesByUserUuid } = useDevice();
  await findDevicesByUserUuid();

  if (devices === undefined || devices.length === 0) next({ name: 'register-device' })
  if (devices !== undefined && devices.length > 0) {
    const hasDevice = devices.find((device) => device.userAgent === navigator.userAgent);
    if (hasDevice === undefined) return next({ name: 'register-device' });
    if (hasDevice !== undefined) return next();
    return next({ name: 'check-device' })
  }
}
