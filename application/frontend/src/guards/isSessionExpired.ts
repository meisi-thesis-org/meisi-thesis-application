import { useSession } from '@/stores/useSession';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocation } from 'vue-router';

export const isSessionExpired = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const useSessionStore = useSession();
  const { session } = storeToRefs(useSessionStore);
  const useUserStore = useUser();
  const { user } = storeToRefs(useUser());


  const isTokenExpired = (accessToken: string) => {
    const expiry = (JSON.parse(atob(accessToken.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  /**
   * In case the user has no session or the userUuid in params is empty
   * Redirect user to access-account
   */
  if (!session.value || !to.params.userUuid) { useSessionStore.signOut(); return next({ name: "access-account" }); }

  /**
   * In case there's session but the paramized userUuid and the userUuid in session are different
   * Redirect user to the desired page with the correct userUuid
   */
  if (session.value.userUuid !== to.params.userUuid) return next({ name: to.name?.toString(), params: { userUuid: session.value?.userUuid } });

  /**
   * In case there's no user found on the state with the stored userUuid
   */
  if (user.value === undefined) {
    /**
     * Lets find the user that is assigned to this session
     */
    const foundUser = await useUserStore.findUserByUuid(session.value!.userUuid);

    /**
     * In case there's no user found with the stored userUuid
     * Clear session
     * Redirect user to the access-account route
     */
    if (foundUser === undefined) {
      useSessionStore.signOut();
      return next({ name: "access-account" })
    };

    /**
     * In case there's a session and there is no user currently on state
     * Update the on state user
     * Redirect to the next page
     */
    useUserStore.setUser(foundUser);
  }

  /**
   * In case the token is expired
   * Refresh the tokens
   */
  if (isTokenExpired(session.value.accessToken)) await useSessionStore.refreshTokens();

  /**
   * In case there's a session and the desired page does not require a session
   * Redirect user to dashboard
   */
  if (to.meta.requiresSession === false) return next({ name: 'dashboard', params: { userUuid: session.value.userUuid } })

  return next();
}
