import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSession } from './useSession';

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

  const findDevicesByUserUuid = async () => {
    const { session } = useSession();
    const response = await createRequest<DeviceEntity[]>('security/devices', 'GET', undefined, { userUuid: session.userUuid });
    devices.value = response.data;
    return devices;
  }

  return { findDevicesByUserUuid };
})

export { useDevice };
