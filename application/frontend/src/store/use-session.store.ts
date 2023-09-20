import { useHttp } from './../composables/use-http.composable';
import { type SessionEntity } from '@/types/entities';
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
  getters: {
    session: (state) => state.session
  },
  actions: {
    async createSession (userUuid: Readonly<string>): Promise<SessionEntity> {
      try {
        const { doRequest } = useHttp();
        const session = await doRequest<SessionEntity>('PUT', `/session/sign-in/${userUuid}`);
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async destroySession (): Promise<SessionEntity> {
      try {
        const { doRequest } = useHttp();
        const session = await doRequest<SessionEntity>('PUT', '/session/sign-out');
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      }
    },
    async refreshSession (): Promise<SessionEntity> {
      try {
        const { doRequest } = useHttp();
        const session = await doRequest<SessionEntity>('PUT', '/session/refresh-tokens');
        this.session = { ...session };
        return this.session;
      } catch (error) {
        console.log(error)
        throw error;
      }
    }
  }
});
