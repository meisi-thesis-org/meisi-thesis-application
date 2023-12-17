import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUser } from './useUser';
import { useLocalStorage } from '@/composables/useLocalStorage';

type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}

const useSession = defineStore('session', () => {
  const { fetch, save, remove } = useLocalStorage()
  const { createRequest } = useFetch();
  const { findUserByAccessCode } = useUser();

  const session = ref<SessionEntity>(fetch('session') ?? {});

  const signIn = async (accessCode: string) => {
    const { uuid } = await findUserByAccessCode(accessCode);
    const response = await createRequest<SessionEntity>(`session/sign-in/${uuid}`, 'PUT');
    session.value = response.data;
    save('session', session.value);
    console.log(session)
  };

  const refreshTokens = async () => {
    const response = await createRequest<SessionEntity>('session/refresh-tokens', 'PUT');
    session.value = response.data;
    save('session', session.value);
  };

  const signOut = async () => {
    await createRequest('session/sign-out', 'PUT');
    session.value = { accessToken: '', refreshToken: '', userUuid: '' }
    remove('session');
  };

  return { session, signIn, refreshTokens, signOut };
})

export { useSession }
