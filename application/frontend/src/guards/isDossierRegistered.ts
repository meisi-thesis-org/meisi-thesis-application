import { usePermission } from '@/composables/usePermission';
import { useBook } from '@/stores/useBook';
import { useDossier } from '@/stores/useDossier';
import { useSession } from '@/stores/useSession';
import { useUser } from '@/stores/useUser';
import type { DossierEntity } from '@/types/Entities';
import { storeToRefs } from 'pinia';
import type { RouteLocation, NavigationGuardNext } from 'vue-router';

export const isDossierRegistered = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext
) => {
  const { isProducer, isConsumer, isGuest } = usePermission(to);
  const useUserStore = useUser();

  /**
     * Checks if there is a parameterized userUuid
     * Yes: Continue
     * No: Redirect user to dashboard with userUuid in session
     */
  const { session } = storeToRefs(useSession());
  const parameterizedUserUuid = to.params.userUuid as string;
  if (!parameterizedUserUuid) return next({ path: 'dashboard', params: { userUuid: session.value?.userUuid } })

  const parameterizedDossierUuid = to.params.dossierUuid as string;

  /**
     * Loads Cached dossier
     */
  const useDossierStore = useDossier();
  const { dossiers } = storeToRefs(useDossierStore)
  const cachedDossier = dossiers.value.find((dossier) => dossier.uuid === parameterizedDossierUuid || dossier.userUuid === parameterizedUserUuid)

  /**
     * Loads books
     */
  const useBookStore = useBook();
  const updateDossierBooksState = async (dossierUuid: string) => {
    const books = await useBookStore.findBooksByQuery(dossierUuid)
    if (books && books.length > 0) useBookStore.updateState(books);
  }

  /**
     * Checks if there is a cached dossier
     * No: Continue
     * Checks if the user is the owner
     * No: Continue
     * Checks if the dossier is deactivated
     * Yes: Redirects to recover-dossier
     * No: Continue
     * Checks if the next route path includes "recover-dossier"
     * Yes: Redirects to dossier
     * No: Continue
     */
  if (cachedDossier) {
    if (isConsumer.value && (!cachedDossier.active || !cachedDossier.visible)) return next({ name: 'dashboard', params: { userUuid: parameterizedUserUuid } })
    if (isProducer.value && !cachedDossier.active && !to.path.includes('recover-dossier')) return next({ name: 'recover-dossier', params: { userUuid: parameterizedUserUuid, dossierUuid: cachedDossier.uuid } })
    const userUsername = (await useUserStore.findUserByUuid(cachedDossier.userUuid)).username;
    to.meta = { username: userUsername }
    if (parameterizedUserUuid && parameterizedDossierUuid && parameterizedDossierUuid === cachedDossier.uuid) return next()
    return next({ name: 'dossier', params: { userUuid: cachedDossier?.userUuid, dossierUuid: cachedDossier?.uuid } });
  }

  /**
     * Loads dossiers
     */
  const updateDossierState = async (foundDossier: DossierEntity | undefined) => {
    if (foundDossier === undefined) return next({ name: 'register-dossier', params: { userUuid: parameterizedUserUuid } })
    if (foundDossier === undefined && isConsumer.value) return next({ name: 'dashboard', params: { userUuid: parameterizedUserUuid } })
    useDossierStore.updateState(foundDossier)
    await updateDossierBooksState(foundDossier.uuid)
    const userUsername = (await useUserStore.findUserByUuid(foundDossier.userUuid)).username;
    to.meta = { username: userUsername }
    if (parameterizedUserUuid && parameterizedDossierUuid && parameterizedDossierUuid === foundDossier?.uuid) return next()
    return next({ name: 'dossier', params: { userUuid: foundDossier?.userUuid, dossierUuid: foundDossier?.uuid } });
  }

  /**
     * If there is no cached dossier
     * No: Continue
     * Is there a dossierUuid
     * Yes: findDossierByUuid
     * Is there a userUuid
     * Yes: findDossiersByQuery
     * Checs if there is a dossier
     * Check is the parameterized user is the owner
     * Yes: Redirects to register-dossier
     */
  if (parameterizedDossierUuid) {
    const foundDossier = await useDossierStore.findDossierByUuid(parameterizedDossierUuid)
    return await updateDossierState(foundDossier)
  }

  if (parameterizedUserUuid) {
    const foundDossiers = await useDossierStore.findDossiersByQuery(parameterizedUserUuid)
    return await updateDossierState(foundDossiers[0])
  }
}
