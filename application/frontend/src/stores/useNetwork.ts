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
    const response = await createRequest<NetworkEntity[]>('security/networks', 'GET', undefined, { userUuid: session.accessToken });
    state.value = response.data;
  }

  return {
    networks: state.value,
    findNetworksByUserUuid
  };
})

export { useNetwork };
