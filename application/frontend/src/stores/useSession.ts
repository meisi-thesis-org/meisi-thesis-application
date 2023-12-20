import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUser } from './useUser';
import { useLocalStorage } from '@/composables/useLocalStorage';
import type { SessionEntity } from '@/types/Entities';

const useSession = defineStore('session', () => {
  const { fetch, save, remove } = useLocalStorage()
  const { createRequest } = useFetch();
  const { findUserByAccessCode } = useUser();

  const state = ref<SessionEntity>(fetch('session') ?? {});

  const signIn = async (accessCode: string) => {
    const { uuid } = await findUserByAccessCode(accessCode);
    const response = await createRequest<SessionEntity>(`session/sign-in/${uuid}`, 'PUT');
    state.value = response.data;
    save('session', state.value);
  };

  const refreshTokens = async () => {
    const response = await createRequest<SessionEntity>('session/refresh-tokens', 'PUT');
    state.value = response.data;
    save('session', state.value);
  };

  const signOut = async () => {
    await createRequest('session/sign-out', 'PUT');
    state.value = { accessToken: '', refreshToken: '', userUuid: '' }
    remove('session');
  };

  return {
    session: state.value,
    signIn,
    refreshTokens,
    signOut
  };
})

export { useSession }
