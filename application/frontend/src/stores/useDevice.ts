import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DeviceEntity } from '@/types/Entities';


const useDevice = defineStore('devices', () => {
  const { createRequest } = useFetch();
  const state = ref<DeviceEntity[]>([]);

  const findDevicesByUserUuid = async (
    userUuid: string
  ) => {
    const response = await createRequest<DeviceEntity[]>('security/devices', 'GET', undefined, { userUuid });
    state.value = response.data;
  }

  const createDevice = async (
    userUuid: string,
    userAgent: string
  ) => {
    const response = await createRequest<DeviceEntity>('security/devices', 'POST', { userUuid, userAgent }, undefined);
    state.value = [response.data];
  }

  return {
    devices: state,
    findDevicesByUserUuid,
    createDevice
  };
})

export { useDevice };
