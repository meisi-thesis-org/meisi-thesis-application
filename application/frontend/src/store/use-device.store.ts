import { useHttpComposable } from '@/composables/use-http.composable';
import { useSpinnerComposable } from '@/composables/use-spinner.composable';
import type { DeviceEntity } from '@/types/entities';
import { defineStore } from 'pinia';

const useDeviceStore = defineStore('device', {
  state: () => ({
    deviceCollection: [] as DeviceEntity[]
  }),
  actions: {
    async findDeviceByUuid (uuid: string): Promise<DeviceEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<DeviceEntity>('GET', `/security/devices/${uuid}`);
        return response;
      } catch (error) {
        return undefined;
      } finally {
        updateState();
      }
    },
    async findDeviceByUserUuid (userUuid: string): Promise<DeviceEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<DeviceEntity>('GET', `/security/devices/${userUuid}`);
        return response;
      } catch (error) {
        return undefined;
      } finally {
        updateState();
      }
    },
    async createDevice (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<DeviceEntity>('POST', '/security/devices', data);
        this.$state.deviceCollection.push(response)
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async updateDeviceByUuid (uuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const response = await doRequest<DeviceEntity>('PUT', `/security/devices/${uuid}`, data);
        this.$state.deviceCollection.find((device) => {
          if (device.uuid === response.uuid) {
            device = { ...device, ...response };
          }

          return device;
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

export { useDeviceStore };
