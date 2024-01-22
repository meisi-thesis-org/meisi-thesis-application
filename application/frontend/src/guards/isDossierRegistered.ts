import { usePermission } from "@/composables/usePermission";
import { useDossier } from "@/stores/useDossier";
import type { DossierEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
) => {
    const paramizedDossierUuid = to.params.dossierUuid as string;
    const paramizedUserUuid = to.params.userUuid as string;

    const useDossierStore = useDossier();
    const { dossiers } = storeToRefs(useDossierStore);
    const { isOwner } = usePermission();

    const cachedDossier = dossiers.value.find((dossier) => dossier.uuid === paramizedDossierUuid || dossier.userUuid === paramizedUserUuid);

    if (cachedDossier) {
        if (!isOwner.value && (!cachedDossier.active || !cachedDossier.visible)) return next({ name: "dashboard" });
        if (isOwner.value && !cachedDossier.active) return next({ name: "recover-dossier" })
        return next();
    }

    const updateCachedDossier = (dossierToCache: DossierEntity | undefined) => {
        if (!isOwner.value && dossierToCache === undefined) return next({ name: "dashboard" });
        if (isOwner.value && dossierToCache === undefined) return next({ name: "register-dossier" });
        useDossierStore.updateState(dossierToCache!);
    }

    if (paramizedDossierUuid) {
        const foundDossier = await useDossierStore.findDossierByUuid(paramizedDossierUuid);
        updateCachedDossier(foundDossier)
    }

    if (paramizedUserUuid) {
        const foundDossier = await useDossierStore.findDossierByUserUuid(paramizedUserUuid);
        updateCachedDossier(foundDossier)
    }


    return next();
}