import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSession } from './useSession';
import type { DeviceEntity } from '@/types/Entities';

const useDevice = defineStore('devices', () => {
  const { createRequest } = useFetch();
  const state = ref<DeviceEntity[]>();

  const findDevicesByUserUuid = async () => {
    const { session } = useSession();
    const response = await createRequest<DeviceEntity[]>('security/devices', 'GET', undefined, { userUuid: session.userUuid });
    state.value = response.data;
  }

  return {
    devices: state.value,
    findDevicesByUserUuid
  };
})

export { useDevice };
