import { useFetch } from '@/composables/useFetch';
import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import type { DeviceEntity } from '@/types/Entities';

const state = ref<DeviceEntity[]>([]);

const useDevice = defineStore('devices', () => {
  const { createRequest } = useFetch();

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
    await createRequest<DeviceEntity[]>('security/devices', 'POST', { userUuid, userAgent }, undefined);
  }

  return {
    devices: state,
    findDevicesByUserUuid,
    createDevice
  };
})

export { useDevice };
