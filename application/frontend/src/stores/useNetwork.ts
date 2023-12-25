import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { NetworkEntity } from '@/types/Entities';

const useNetwork = defineStore('networks', () => {
  const { createRequest } = useFetch();
  const state = ref<NetworkEntity[]>([]);

  const findNetworksByUserUuid = async (
    userUuid: string
  ) => {
    const response = await createRequest<NetworkEntity[]>('security/networks', 'GET', undefined, { userUuid });
    state.value = response.data;
  }

  const createNetwork = async (
    userUuid: string,
    latitude: number,
    longitude: number
  ) => {
    await createRequest<NetworkEntity[]>('security/networks', 'POST', { userUuid, latitude, longitude }, undefined);
  }

  return {
    networks: state,
    findNetworksByUserUuid,
    createNetwork
  };
})

export { useNetwork };
