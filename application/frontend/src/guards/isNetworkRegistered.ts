import { useLocalStorage } from '@/composables/useLocalStorage';
import { useNetwork } from '@/stores/useNetwork';
import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isNetworkRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useNetworkStore = useNetwork();
  const { networks } = storeToRefs(useNetworkStore);
  const { session } = storeToRefs(useSession());

  const position = await new Promise<{ coords: { latitude: number, longitude: number }}>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    )
  })

  if (session.value === undefined) return next({ name: "access-account" });

  const sessionUserUuid = session.value?.userUuid;

  const coordinates = {
    minLatitude: position.coords.latitude - 10,
    maxLatitude: position.coords.latitude + 10,
    minLongitude: position.coords.longitude - 10,
    maxLongitude: position.coords.longitude + 10
  }

  const isNetworkOnState = networks.value.find(({ userUuid, latitude, longitude }) =>
    userUuid === sessionUserUuid &&
    (
      latitude >= coordinates.minLatitude &&
      latitude <= coordinates.maxLatitude &&
      longitude >= coordinates.minLongitude &&
      longitude <= coordinates.maxLongitude
    ));
  if (isNetworkOnState) return next();

  await useNetworkStore.findNetworksByUserUuid(sessionUserUuid);

  if (networks.value.length === 0) return next({ name: 'register-network', params: { userUuid: session.value.userUuid } })
  if (networks.value.length > 0) {
    const hasNetwork = networks.value.find(({ latitude, longitude }) =>
      latitude >= coordinates.minLatitude &&
      latitude <= coordinates.maxLatitude &&
      longitude >= coordinates.minLongitude &&
      longitude <= coordinates.maxLongitude
    );
    if (hasNetwork === undefined) return next({ name: 'register-network', params: { userUuid: session.value.userUuid } });
    if (hasNetwork !== undefined) return next();
  }

  return next({ name: 'check-network', params: { userUuid: session.value.userUuid } })
}
