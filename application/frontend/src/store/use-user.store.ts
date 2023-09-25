import { useSpinnerComposable } from './../composables/use-spinner.composable';
import { useHttpComposable } from './../composables/use-http.composable';
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
  actions: {
    async findUserByUuid (userUuid: string): Promise<UserEntity> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        return await doRequest('GET', `/security/users/${userUuid}`);
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async findUserByAccessCode (accessCode: string): Promise<UserEntity> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        return await doRequest('GET', `/security/users/access-code/${accessCode}`);
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async createUser (data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const userEntity = await doRequest<UserEntity>('POST', '/security/users', data);
        this.$state.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async updateUser (userUuid: string, data: Record<string, string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const userEntity = await doRequest<UserEntity>('PUT', `/security/users/:${userUuid}`, data)
        this.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    },
    async updateAccessCode (data: Record<string, string | undefined>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState();
        const userEntity = await doRequest<UserEntity>('PUT', '/security/users/access-code', data)
        this.user = { ...userEntity };
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState();
      }
    }
  }
});
