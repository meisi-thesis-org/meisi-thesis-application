import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type DeviceEntity = {
  readonly uuid: string
  readonly userUuid: string
  userAgent: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

const useDevice = defineStore('devices', () => {
  const { createRequest } = useFetch();
  const devices = ref<DeviceEntity[]>();

  const findDevicesByUserUuid = async (userUuid: string) => {
    const response = await createRequest<DeviceEntity[]>('security/devices', 'GET', { userUuid });
    devices.value = response.data;
  }

  return { devices, findDevicesByUserUuid };
})

export { useDevice };
