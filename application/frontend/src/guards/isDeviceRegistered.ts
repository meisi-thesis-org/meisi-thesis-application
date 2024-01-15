import { useLocalStorage } from '@/composables/useLocalStorage';
import { useDevice } from '@/stores/useDevice';
import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isDeviceRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useDeviceStore = useDevice();
  const useSessionStore = useSession();
  const { devices } = storeToRefs(useDeviceStore);
  const { session } = storeToRefs(useSessionStore);

  const sessionUserUuid = session.value!.userUuid;
  const isCurrentDevice = computed(() => devices.value.find(({ userUuid, userAgent }) => userUuid === sessionUserUuid && userAgent === navigator.userAgent))
  /**
   * Find Device on State
   */
  if (isCurrentDevice.value) return next();

  /**
   * In case the device is non present on state we need to fetch it from the server
   */
  const response = await useDeviceStore.findDevicesByUserUuid(sessionUserUuid);
  if (response.length === 0) return next({ name: 'register-device', params: { userUuid: sessionUserUuid } })
  useDeviceStore.updateStateDevices(response);

  /**
   * In case the device is present on the state after fetching we resume the navigation
   */
  if (isCurrentDevice.value !== undefined) return next();

  /**
   * In case the device is non present on the state after fetching we allow navigation with restricted permissions
   */
  return next({ name: 'check-device', params: { userUuid: sessionUserUuid } })
}
