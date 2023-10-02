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

      try {
        updateState();
        const response = await doRequest<LocationEntity>('GET', `/security/locations/${uuid}`);
        return response;
      } catch (error) {
        return undefined;
      } finally {
        updateState();
      }
    },
    async findLocationByUserUuid (userUuid: string): Promise<LocationEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<LocationEntity>('GET', `/security/locations/${userUuid}`);
        return response;
      } catch (error) {
        return undefined;
      } finally {
        updateState();
      }
    },
    async createLocation (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<LocationEntity>('POST', '/security/locations', data);
        this.$state.locationCollection.push(response)
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async updateLocationByUuid (uuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<LocationEntity>('PUT', `/security/locations/${uuid}`, data);
        this.$state.locationCollection.find((location) => {
          if (location.uuid === response.uuid) {
            location = { ...location, ...response };
          }

          return location;
        })
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    }
  }
});

export { useLocationStore };
