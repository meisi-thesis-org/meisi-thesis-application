import { usePermission } from "@/composables/usePermission";
import { useBook } from "@/stores/useBook";
import { useDossier } from "@/stores/useDossier";
import { useSession } from "@/stores/useSession";
import type { DossierEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { isOwner } = usePermission();

    /**
     * Checks if there is a parameterized userUuid
     * Yes: Continue
     * No: Redirect user to dashboard with userUuid in session
     */
    const { session } = storeToRefs(useSession());
    const parameterizedUserUuid = to.params.userUuid as string;
    if (!parameterizedUserUuid) return next({ path: "dashboard", params: { userUuid: session.value?.userUuid } })

    /**
     * Checks if there is a dossierUuid
     * No: Continue
     * Checks if the user is the owner
     * Yes: Continue
     * No: Redirects to dashboard
     */
    const parameterizedDossierUuid = to.params.dossierUuid as string;
    if (!parameterizedDossierUuid && !isOwner(parameterizedUserUuid)) return next({ name: "dashboard", params: { userUuid: session.value?.userUuid } });

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
        const books = await useBookStore.findBooksByDossierUuid(dossierUuid)
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
        if (!isOwner(parameterizedUserUuid) && (!cachedDossier.active || !cachedDossier.visible)) return next({ name: "dashboard", params: { userUuid: parameterizedUserUuid } })
        if (isOwner(parameterizedUserUuid) && !cachedDossier.active && !to.path.includes("recover-dossier")) return next({ name: "recover-dossier", params: { userUuid: parameterizedUserUuid, dossierUuid: cachedDossier.uuid } })
        if(parameterizedUserUuid && parameterizedDossierUuid && parameterizedDossierUuid === cachedDossier.uuid) return next()
        return next({ name: "dossier", params: { userUuid: cachedDossier?.userUuid, dossierUuid: cachedDossier?.uuid } });
    }

    /**
     * Loads dossiers
     */
    const updateDossierState = (async (foundDossier: DossierEntity | undefined) => {
        if (!foundDossier && isOwner(parameterizedUserUuid)) return next({ name: "register-dossier", params: { userUuid: parameterizedUserUuid } })
        if (!foundDossier && !isOwner(parameterizedUserUuid)) return next({ name: "dashboard", params: { userUuid: parameterizedUserUuid } })
        useDossierStore.updateState(foundDossier!)
        await updateDossierBooksState(foundDossier!.uuid)
        if(parameterizedUserUuid && parameterizedDossierUuid && parameterizedDossierUuid === foundDossier?.uuid) return next()
        return next({ name: "dossier", params: { userUuid: foundDossier?.userUuid, dossierUuid: foundDossier?.uuid } });
    })

    /**
     * If there is no cached dossier
     * No: Continue
     * Is there a dossierUuid
     * Yes: findDossierByUuid
     * Is there a userUuid
     * Yes: findDossierByUserUuid
     * Checs if there is a dossier
     * Check is the parameterized user is the owner
     * Yes: Redirects to register-dossier
     */
    if (parameterizedDossierUuid) {
        const foundDossier = await useDossierStore.findDossierByUuid(parameterizedDossierUuid)
        await updateDossierState(foundDossier)
    }

    if (parameterizedUserUuid) {
        const foundDossier = await useDossierStore.findDossierByUserUuid(parameterizedUserUuid)
        await updateDossierState(foundDossier)
    }
}