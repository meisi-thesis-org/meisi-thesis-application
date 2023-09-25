import { useHttpComposable } from './../composables/use-http.composable';
import { useSpinnerComposable } from './../composables/use-spinner.composable';
import { type SessionEntity } from './../types/entities';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: useStorage<SessionEntity>('session', {
      userUuid: '',
      accessToken: '',
      refreshToken: ''
    })
  }),
  actions: {
    async createSession (userUuid: Readonly<string>): Promise<SessionEntity> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState()
        const session = await doRequest<SessionEntity>('PUT', `/session/sign-in/${userUuid}`);
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState()
      }
    },
    async destroySession (): Promise<SessionEntity> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState()
        const session = await doRequest<SessionEntity>('PUT', '/session/sign-out');
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState()
      }
    },
    async refreshSession (): Promise<SessionEntity> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      try {
        updateState()
        const session = await doRequest<SessionEntity>('PUT', '/session/refresh-tokens');
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      } finally {
        updateState()
      }
    }
  }
});
