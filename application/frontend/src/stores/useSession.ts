import { useFetch } from '@/composables/useFetch';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUser } from './useUser';

type SessionEntity = {
  userUuid: string
  accessToken: string
  refreshToken: string
}

const useSession = defineStore('session', () => {
  const { createRequest } = useFetch()
  const { findUserByAccessCode } = useUser()
  const session = ref<SessionEntity>();

  const signIn = async (accessCode: string) => {
    const { uuid } = await findUserByAccessCode(accessCode);
    const response = await createRequest(`localhost:8000/session/sign-in/${uuid}`, 'PUT');
    session.value = await response.json() as SessionEntity
  };

  const refreshTokens = async (accessCode: string) => {
    const response = await createRequest('localhost:8000/session/refresh-tokens', 'PUT');
    session.value = await response.json() as SessionEntity
  };

  const signOut = async (accessCode: string) => {
    await createRequest('localhost:8000/session/sign-out', 'PUT');
    session.value = { accessToken: '', refreshToken: '', userUuid: '' }
  };

  return { session, signIn, refreshTokens, signOut };
})

export { useSession }
