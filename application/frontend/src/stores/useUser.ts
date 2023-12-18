import { useFetch } from '@/composables/useFetch';
import type { Primitive } from '@/types/Primitive';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type UserEntity = {
  readonly uuid: string
  username: string
  email: string
  phoneNumber: string
  name: string
  dateBirth: string
  createdAt: string
  updatedAt: string
}

export const useUser = defineStore('user', () => {
  const { createRequest } = useFetch()
  const user = ref<UserEntity>();

  const findUserByUuid = async (uuid: string) => {
    const response = await createRequest<UserEntity>(`security/users/${uuid}`, 'GET');
    return response.data;
  }

  const findUserByAccessCode = async (accessCode: string) => {
    const response = await createRequest<UserEntity>(`security/users/access-code/${accessCode}`, 'GET');
    return response.data;
  }

  const createUser = async (params: Record<string, Primitive>) => {
    const response = await createRequest<UserEntity>('security/users', 'POST', params);
    user.value = response.data;
  }

  const updateUserByUuid = async (
    uuid: string,
    params: Record<string, Primitive>
  ) => {
    const response = await createRequest<UserEntity>(`security/users/${uuid}`, 'PUT', params);
    user.value = response.data;
  }

  const updateUserAccessCode = async (
    params: Record<string, Primitive>
  ) => {
    const response = await createRequest<UserEntity>('security/users/access-code', 'PUT', params);
    user.value = response.data;
  }

  return { user, findUserByUuid, findUserByAccessCode, createUser, updateUserByUuid, updateUserAccessCode };
});
