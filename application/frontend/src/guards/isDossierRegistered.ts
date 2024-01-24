import { usePermission } from "@/composables/usePermission";
import { useDossier } from "@/stores/useDossier";
import type { DossierEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const paramizedDossierUuid = to.params.dossierUuid as string;
    const paramizedUserUuid = to.params.userUuid as string;

    const useDossierStore = useDossier();
    const { dossiers } = storeToRefs(useDossierStore);
    const { isOwner } = usePermission();

    const cachedDossier = dossiers.value.find((dossier) => dossier.uuid === paramizedDossierUuid || dossier.userUuid === paramizedUserUuid);

    if (cachedDossier) {
        if (!isOwner(paramizedUserUuid) && (!cachedDossier.active || !cachedDossier.visible)) return next({ name: "dashboard", params: { userUuid: paramizedUserUuid } });
        if (isOwner(paramizedUserUuid) && !cachedDossier.active) return next({ name: "recover-dossier", params: { userUuid: paramizedUserUuid } })
        if (!paramizedDossierUuid) return next({ name: "dossier", params: { userUuid: paramizedUserUuid, dossierUuid: cachedDossier?.uuid }, replace: true });
        return next();
    }

    const updateCachedDossier = (dossierToCache: DossierEntity | undefined) => {
        if (!isOwner(paramizedUserUuid) && dossierToCache === undefined) return next({ name: "dashboard", params: { userUuid: paramizedUserUuid } });
        if (isOwner(paramizedUserUuid) && dossierToCache === undefined) return next({ name: "register-dossier", params: { userUuid: paramizedUserUuid } });
        useDossierStore.updateState(dossierToCache!);
        return next({ name: "dossier", params: { userUuid: paramizedUserUuid, dossierUuid: dossierToCache?.uuid } });
    }

    if (paramizedDossierUuid) {
        const foundDossier = await useDossierStore.findDossierByUuid(paramizedDossierUuid);
        return updateCachedDossier(foundDossier)
    }

    if (paramizedUserUuid) {
        const foundDossier = await useDossierStore.findDossierByUserUuid(paramizedUserUuid);
        return updateCachedDossier(foundDossier)
    } 

}