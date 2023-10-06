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
    async createSession (userUuid: Readonly<string>): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<SessionEntity>('PUT', `/session/sign-in/${userUuid}`);
      if (response !== undefined) this.session = { ...response };
      updateState();
    },
    async destroySession (): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<SessionEntity>('PUT', '/session/sign-out');
      if (response !== undefined) this.session = { ...response };
      updateState();
    },
    async refreshSession (): Promise<void> {
      const { doRequest } = useHttpComposable();
      const { updateState } = useSpinnerComposable();

      updateState();
      const response = await doRequest<SessionEntity>('PUT', '/session/refresh-tokens');
      if (response !== undefined) this.session = { ...response };
      updateState();
    },
    clearSession (): void {
      this.session = {
        userUuid: '',
        accessToken: '',
        refreshToken: ''
      }
    }
  }
});
