import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NetworkEntity } from '@/types/Entities';

const useNetwork = defineStore('networks', () => {
  const { createRequest } = useFetch();
  const state = ref<NetworkEntity[]>([]);

  const updateStateNetwork = (newNetwork: NetworkEntity[]) => state.value = newNetwork
  
  const findNetworksByUserUuid = async (
    userUuid: string
  ) => {
    return (await createRequest<NetworkEntity[]>('security/networks', 'GET', undefined, { userUuid })).data;
  }

  const createNetwork = async (
    userUuid: string,
    latitude: number,
    longitude: number
  ) => {
    const response = await createRequest<NetworkEntity>('security/networks', 'POST', { userUuid, latitude, longitude }, undefined);
    state.value = [response.data];
  }

  return {
    networks: state,
    updateStateNetwork,
    findNetworksByUserUuid,
    createNetwork
  };
})

export { useNetwork };
