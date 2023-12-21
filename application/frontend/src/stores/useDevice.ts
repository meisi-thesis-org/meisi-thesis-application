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

  const createDevice = async (
    userAgent: string
  ) => {
    const { session } = useSession();
    await createRequest<DeviceEntity[]>('security/devices', 'POST', { userUuid: session.userUuid, userAgent }, undefined);
  }

  return {
    devices: state.value,
    findDevicesByUserUuid,
    createDevice
  };
})

export { useDevice };
