import { useNetwork } from '@/stores/useNetwork';
import { useSession } from '@/stores/useSession';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const useNetworkResolver = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { session } = useSession();
  const { networks, findNetworksByUserUuid } = useNetwork();
  await findNetworksByUserUuid(session.userUuid);

  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = {
      minLatitude: position.coords.latitude - 10,
      maxLatitude: position.coords.latitude + 10,
      minLongitude: position.coords.longitude - 10,
      maxLongitude: position.coords.longitude + 10
    }

    const hasNetwork = networks?.find((network) =>
      network.latitude >= coordinates.minLatitude &&
      network.latitude <= coordinates.maxLatitude &&
      network.longitude >= coordinates.minLongitude &&
      network.longitude <= coordinates.maxLongitude
    );

    if (hasNetwork !== undefined) return next({ name: "dashboard" });
  })
  return next();
}
