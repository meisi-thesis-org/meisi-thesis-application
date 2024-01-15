import { useSession } from '@/stores/useSession';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const isUserRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { setUser, findUserByUuid } = useUser();
    const useSessionStore = useSession()
    const { session } = storeToRefs(useSessionStore);

    const foundUser = await findUserByUuid(session.value!.userUuid);
    
    if (foundUser === undefined) {
        useSessionStore.signOut();
        return next({ name: "access-account" })
    };

    setUser(foundUser);
    return next();
}
