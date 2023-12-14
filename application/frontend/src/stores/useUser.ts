import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type UserEntity = {
  readonly uuid: string
  username: string
  email: string
  phoneNumber: string
  accessCode: string
  name: string
  dateBirth: string
  createdAt: string
  updatedAt: string
}

export const useUser = defineStore('user', () => {
  const { createRequest } = useFetch()
  const user = ref<UserEntity>();

  const findUserByUuid = async (uuid: string) => {
    const response = await createRequest(`localhost:8000/security/users/${uuid}`, 'GET');
    return await response.json() as UserEntity;
  }

  const findUserByAccessCode = async (accessCode: string): Promise<UserEntity> => {
    const response = await createRequest(`localhost:8000/security/users/${accessCode}`, 'GET');
    return await response.json() as UserEntity;
  }

  const createUser = async <T>(params: Record<string, T>) => {
    const response = await createRequest('localhost:8000/security/users', 'POST', params);
    user.value = await response.json() as UserEntity;
  }

  const updateUserByUuid = async <T>(
    uuid: string,
    params: Record<string, T>
  ) => {
    const response = await createRequest(`localhost:8000/security/users/${uuid}`, 'PUT', params);
    user.value = await response.json() as UserEntity;
  }

  const updateUserAccessCode = async <T>(
    accessCode: string,
    params: Record<string, T>
  ) => {
    const response = await createRequest(`localhost:8000/security/users/${accessCode}`, 'PUT', params);
    user.value = await response.json() as UserEntity;
  }

  return { user, findUserByUuid, findUserByAccessCode, createUser, updateUserByUuid, updateUserAccessCode };
});
