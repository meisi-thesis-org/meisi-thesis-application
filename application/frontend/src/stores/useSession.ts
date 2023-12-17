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
    const response = await createRequest(`http://localhost:8000/session/sign-in/${uuid}`, 'PUT');
    session.value = await response.json() as SessionEntity;
    save('session', session.value);
    console.log(session)
  };

  const refreshTokens = async () => {
    const response = await createRequest('http://localhost:8000/session/refresh-tokens', 'PUT');
    session.value = await response.json() as SessionEntity
    save('session', session.value);
  };

  const signOut = async () => {
    await createRequest('http://localhost:8000/session/sign-out', 'PUT');
    session.value = { accessToken: '', refreshToken: '', userUuid: '' }
    remove('session');
  };

  return { session, signIn, refreshTokens, signOut };
})

export { useSession }
