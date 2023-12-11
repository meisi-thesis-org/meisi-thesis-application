import { useFetch } from "@/composables/useFetch";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUser } from "./useUser";
import { useStorage } from "@/composables/useStorage";

type SessionEntity = {
    userUuid: string
    accessToken: string
    refreshToken: string
}


export const useSession = defineStore('session', () => {
    const { findUserByAcessCode } = useUser()
    const { createRequest } = useFetch();
    const { save } = useStorage();
    const session = ref<SessionEntity>();

    const signIn = async (accessCode: string) => {
        try {
            const user = await findUserByAcessCode(accessCode);
            const response = await createRequest(`localhost:8000/session/sign-in/${user.uuid}`, 'PUT');
            const session = await response.json() as SessionEntity;
            save('accessToken', session.accessToken);
            save('refreshToken', session.refreshToken);
        } catch (error) {
            throw error;
        }
    }
    return { session, signIn };
})