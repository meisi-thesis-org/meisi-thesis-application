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
      updateState();
      const response = await doRequest<DeviceEntity>('GET', `/security/devices/${uuid}`);
      updateState();
      return response;
    },
    async findDeviceByUserUuid (userUuid: string): Promise<DeviceEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<DeviceEntity>('GET', `/security/devices/${userUuid}`);
      updateState();
      return response;
    },
    async createDevice (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<DeviceEntity>('POST', '/security/devices', data);
      if (response !== undefined) this.$state.deviceCollection.push(response)
      updateState();
    },
    async updateDeviceByUuid (uuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<DeviceEntity>('PUT', `/security/devices/${uuid}`, data);
      if (response !== undefined) {
        this.$state.deviceCollection.find((device) => {
          if (device.uuid === response.uuid) {
            device = { ...device, ...response };
          }

          return device;
        })
      }
      updateState();
    }
  }
});

export { useDeviceStore };
