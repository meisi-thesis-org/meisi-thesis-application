import { useNetwork } from '@/stores/useNetwork';
import { type NavigationGuardNext, type RouteLocation } from 'vue-router';

export const isNetworkRegistered = async (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { networks, findNetworksByUserUuid } = useNetwork();
  await findNetworksByUserUuid();

  if (networks === undefined || networks.length === 0) next({ name: 'register-network' })
  if (networks !== undefined && networks.length > 0) {
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

      if (hasNetwork === undefined) return next({ name: 'register-network' });
      if (hasNetwork !== undefined) return next();
    })

    return next({ name: 'check-network' })
  }
}
