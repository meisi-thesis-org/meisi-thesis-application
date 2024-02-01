import { useLocalStorage } from '@/composables/useLocalStorage';
import { useNetwork } from '@/stores/useNetwork';
import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isNetworkRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useNetworkStore = useNetwork();
  const { networks } = storeToRefs(useNetworkStore);
  const { session } = storeToRefs(useSession());
  const { fetch } = useLocalStorage();

  if (fetch("is_network_unknown") === true) {
    return next();
  }

  const position = await new Promise<{ coords: { latitude: number, longitude: number } }>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    )
  })

  const sessionUserUuid = session.value!.userUuid;

  const isCurrentNetwork = computed(() => networks.value.find(({ userUuid, latitude, longitude }) =>
    userUuid === sessionUserUuid &&
    (
      latitude >= position.coords.latitude - 10 &&
      latitude <= position.coords.latitude + 10 &&
      longitude >= position.coords.longitude - 10 &&
      longitude <= position.coords.longitude + 10
    )))

  /**
   * In case the network is registered on state
   */
  if (isCurrentNetwork.value !== undefined) return next();

  /**
   * In case the are no networks registered on state
   * Fetch it from server
   * Update state
   */
  const response = await useNetworkStore.findNetworksByUserUuid(sessionUserUuid);
  if (response.length === 0) return next({ name: 'register-network', params: { userUuid: sessionUserUuid } })
  useNetworkStore.updateStateNetwork(response)

  /**
   * In case there are networks is registered on state
   * Check to see if current network is already registered
   * Then resume navigation
    */
  if (isCurrentNetwork.value !== undefined) return next();

  /**
   * Resume Navigation with restricted access
   */
  return next({ name: 'check-network', params: { userUuid: sessionUserUuid } })
}
