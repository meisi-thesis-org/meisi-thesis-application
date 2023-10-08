import { useHttpComposable } from '@/composables/use-http.composable';
import { useSpinnerComposable } from '@/composables/use-spinner.composable';
import type { NetworkEntity } from '@/types/entities';
import { defineStore } from 'pinia';

const useNetworkStore = defineStore('network', {
  state: () => ({
    networkCollection: [] as NetworkEntity[]
  }),
  actions: {
    async findNetworkByUuid (uuid: string): Promise<NetworkEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<NetworkEntity>('GET', `/security/networks/${uuid}`);
      updateState();
      return response;
    },
    async findNetworkByUserUuid (userUuid: string): Promise<NetworkEntity | undefined> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<NetworkEntity>('GET', `/security/networks/${userUuid}`);
      updateState();
      return response;
    },
    async createNetwork (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<NetworkEntity>('POST', '/security/networks', data);
      if (response !== undefined) this.$state.networkCollection.push(response);
      updateState();
    },
    async updateNetworkByUuid (uuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<NetworkEntity>('PUT', `/security/networks/${uuid}`, data);
      if (response !== undefined) {
        this.$state.networkCollection.find((network) => {
          if (network.uuid === response.uuid) {
            network = { ...network, ...response };
          }

          return network;
        })
      }
      updateState();
    }
  }
});

export { useNetworkStore };
