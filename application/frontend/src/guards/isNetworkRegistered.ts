import { useLocalStorage } from '@/composables/useLocalStorage';
import { useLocation } from '@/composables/useLocation';
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
  const { fetch, save } = useLocalStorage();
  const { location, loadLocation } = useLocation();

  if (fetch("is_network_unknown") !== null) {
    return next();
  }
  
  await loadLocation();

  const sessionUserUuid = session.value!.userUuid;

  const isCurrentNetwork = computed(() => networks.value.find(({ userUuid, latitude, longitude }) =>
    userUuid === sessionUserUuid &&
    (
      latitude >= location.value.latitude - 10 &&
      latitude <= location.value.latitude + 10 &&
      longitude >= location.value.longitude - 10 &&
      longitude <= location.value.longitude + 10
    )))

  /**
   * In case the network is registered on state
   */
  if (isCurrentNetwork.value !== undefined) {
    save('is_network_unknown', false);
    return next();
  };

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
  if (isCurrentNetwork.value !== undefined) {
    save('is_network_unknown', false);
    return next();
  }

  /**
   * Resume Navigation with restricted access
   */
  return next({ name: 'check-network', params: { userUuid: sessionUserUuid } })
}
