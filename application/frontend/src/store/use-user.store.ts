import { useHttp } from './../composables/use-http.composable';
import type { UserEntity } from './../types/entities';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: (): { user: UserEntity } => ({
    user: {
      uuid: '',
      email: '',
      username: '',
      phoneNumber: '',
      name: '',
      dateBirth: '',
      createdAt: '',
      updatedAt: ''
    }
  }),
  getters: {
    user: (state) => state.user
  },
  actions: {
    async findUserByUuid (userUuid: string): Promise<UserEntity> {
      try {
        const { doRequest } = useHttp();
        return await doRequest('GET', `/security/users/${userUuid}`);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async findUserByAccessCode (accessCode: string): Promise<UserEntity> {
      try {
        const { doRequest } = useHttp();
        return await doRequest('GET', `/security/users/access-code/${accessCode}`);
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async createUser (data: Record<string, string>): Promise<void> {
      try {
        const { doRequest } = useHttp();
        const userEntity = await doRequest<UserEntity>('POST', '/security/users', data)
        this.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async updateUser (userUuid: string, data: Record<string, string>): Promise<void> {
      try {
        const { doRequest } = useHttp();
        const userEntity = await doRequest<UserEntity>('PUT', `/security/users/:${userUuid}`, data)
        this.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async updateAccessCode (data: Record<string, string>): Promise<void> {
      try {
        const { doRequest } = useHttp();
        const userEntity = await doRequest<UserEntity>('PUT', '/security/users/access-code', data)
        this.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  }
});
