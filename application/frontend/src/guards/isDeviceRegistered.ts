import { useLocalStorage } from '@/composables/useLocalStorage';
import { useDevice } from '@/stores/useDevice';
import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isDeviceRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useDeviceStore = useDevice();
  const useSessionStore = useSession();
  const { fetch } = useLocalStorage();
  const { devices } = storeToRefs(useDeviceStore);
  const { session } = storeToRefs(useSessionStore);

  if (fetch('is_device_unknown') !== null) return next();

  if (!session.value) return next({ name: "access-account" });

  const sessionUserUuid = session.value.userUuid;
  const navigatorUserAgent = navigator.userAgent;

  /**
   * Find Device on State
   */
  const isDeviceOnState = devices.value.find(({ userUuid, userAgent }) => userUuid === sessionUserUuid && userAgent === navigatorUserAgent);
  if (isDeviceOnState) return next();

  /**
   * In case the device is non present on state we need to fetch it from the server
   */
  await useDeviceStore.findDevicesByUserUuid(sessionUserUuid);

  if (devices.value.length === 0) return next({ name: 'register-device' })
  if (devices.value.length > 0) {
    const hasDevice = devices.value.find(({ userAgent }) => userAgent === navigatorUserAgent);
    if (hasDevice === undefined) return next({ name: 'register-device' });
    if (hasDevice !== undefined) return next();
    return next({ name: 'check-device' })
  }
}
