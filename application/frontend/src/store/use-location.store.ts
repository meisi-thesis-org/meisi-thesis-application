import { useHttpComposable } from '@/composables/use-http.composable';
import { useSpinnerComposable } from '@/composables/use-spinner.composable';
import type { LocationEntity } from '@/types/entities';
import { defineStore } from 'pinia';

const useLocationStore = defineStore('location', {
  state: () => ({
    locationCollection: [] as LocationEntity[]
  }),
  actions: {
    async findLocationByUuid (uuid: string): Promise<LocationEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<LocationEntity>('GET', `/security/locations/${uuid}`);
      updateState();
      return response;
    },
    async findLocationByUserUuid (userUuid: string): Promise<LocationEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<LocationEntity>('GET', `/security/locations/${userUuid}`);
      updateState();
      return response;
    },
    async createLocation (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<LocationEntity>('POST', '/security/locations', data);
      if (response !== undefined) this.$state.locationCollection.push(response);
      updateState();
    },
    async updateLocationByUuid (uuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<LocationEntity>('PUT', `/security/locations/${uuid}`, data);
      if (response !== undefined) {
        this.$state.locationCollection.find((location) => {
          if (location.uuid === response.uuid) {
            location = { ...location, ...response };
          }

          return location;
        })
      }
      updateState();
    }
  }
});

export { useLocationStore };
