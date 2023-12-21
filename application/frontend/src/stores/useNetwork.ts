import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSession } from './useSession';
import type { NetworkEntity } from '@/types/Entities';

const useNetwork = defineStore('networks', () => {
  const { createRequest } = useFetch();
  const state = ref<NetworkEntity[]>();

  const findNetworksByUserUuid = async () => {
    const { session } = useSession();
    const response = await createRequest<NetworkEntity[]>('security/networks', 'GET', undefined, { userUuid: session.userUuid });
    state.value = response.data;
  }

  const createNetwork = async (
    latitude: number,
    longitude: number
  ) => {
    const { session } = useSession();
    await createRequest<NetworkEntity[]>('security/networks', 'POST', { userUuid: session.userUuid, latitude, longitude }, undefined);
  }

  return {
    networks: state.value,
    findNetworksByUserUuid,
    createNetwork
  };
})

export { useNetwork };
