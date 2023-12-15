import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUser } from './useUser';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useLoader } from '@/composables/useLoader';

type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}

const useSession = defineStore('session', () => {
  const { save, remove } = useLocalStorage()
  const { createRequest } = useFetch();
  const { findUserByAccessCode } = useUser();

  const session = ref<SessionEntity>();

  const signIn = async (accessCode: string) => {
    const { uuid } = await findUserByAccessCode(accessCode);
    const response = await createRequest(`http://localhost:8000/session/sign-in/${uuid}`, 'PUT');
    session.value = await response.json() as SessionEntity;
    save('accessToken', session.value.accessToken);
    save('refreshToken', session.value.refreshToken);
  };

  const refreshTokens = async () => {
    const response = await createRequest('http://localhost:8000/session/refresh-tokens', 'PUT');
    session.value = await response.json() as SessionEntity
    save('accessToken', session.value.accessToken);
    save('refreshToken', session.value.refreshToken);
  };

  const signOut = async () => {
    await createRequest('http://localhost:8000/session/sign-out', 'PUT');
    session.value = { accessToken: '', refreshToken: '', userUuid: '' }
    remove('accessToken');
    remove('refreshToken');
  };

  return { session, signIn, refreshTokens, signOut };
})

export { useSession }
