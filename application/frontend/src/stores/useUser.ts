import { useFetch } from '@/composables/useFetch';
import type { UserEntity } from '@/types/Entities';
import type { Primitive } from '@/types/Primitive';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUser = defineStore('user', () => {
  const { createRequest } = useFetch()
  const state = ref<UserEntity>();

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
    state.value = response.data;
  }

  const updateUserByUuid = async (
    uuid: string,
    params: Record<string, Primitive>
  ) => {
    const response = await createRequest<UserEntity>(`security/users/${uuid}`, 'PUT', params);
    state.value = response.data;
  }

  const updateUserAccessCode = async (
    params: Record<string, Primitive>
  ) => {
    const response = await createRequest<UserEntity>('security/users/access-code', 'PUT', params);
    state.value = response.data;
  }

  return {
    user: state.value,
    findUserByUuid,
    findUserByAccessCode,
    createUser,
    updateUserByUuid,
    updateUserAccessCode
  };
});
