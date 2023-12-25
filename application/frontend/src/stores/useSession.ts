import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUser } from './useUser';
import { useLocalStorage } from '@/composables/useLocalStorage';
import type { SessionEntity } from '@/types/Entities';

const useSession = defineStore('session', () => {
  const { fetch, save, remove, clear } = useLocalStorage()
  const { createRequest } = useFetch();
  const { findUserByAccessCode } = useUser();

  const state = ref<SessionEntity | undefined>(fetch('session') ?? undefined);

  const signIn = async (accessCode: string) => {
    const { uuid } = await findUserByAccessCode(accessCode);
    const response = await createRequest<SessionEntity>(`session/sign-in/${uuid}`, 'PUT');
    state.value = response.data;
    save('session', state.value);
  };

  const refreshTokens = async () => {
    try {
      const response = await createRequest<SessionEntity>('session/refresh-tokens', 'PUT');
      state.value = response.data;
      save('session', state.value);
    } catch (error) {
      remove("session");
    }
  };

  const signOut = async () => {
    await createRequest('session/sign-out', 'PUT');
    state.value = { accessToken: '', refreshToken: '', userUuid: '' }
    clear();
  };

  return {
    session: state,
    signIn,
    refreshTokens,
    signOut
  };
})

export { useSession }
