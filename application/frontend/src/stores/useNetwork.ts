import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type NetworkEntity = {
  readonly uuid: string
  readonly userUuid: string
  latitude: number
  longitude: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

const useNetwork = defineStore('networks', () => {
  const { createRequest } = useFetch();
  const networks = ref<NetworkEntity[]>();

  const findNetworksByUserUuid = async (userUuid: string) => {
    const response = await createRequest<NetworkEntity[]>('security/networks', 'GET', undefined, { userUuid });
    networks.value = response.data;
  }

  return { networks, findNetworksByUserUuid };
})

export { useNetwork };
