import { useDossier } from "@/stores/useDossier";
import { useSession } from "@/stores/useSession";
import { storeToRefs } from "pinia";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { setDossier, findDossierByUserUuid } = useDossier()
    const { dossier } = storeToRefs(useDossier())

    if (dossier.value !== undefined) {
        if (to.name === "register-dossier") return next({ name: "dossier", params: { userUuid: to.params.userUuid } });
        if (to.name === "recover-dossier" && dossier.value.active) return next({ name: "dossier", params: { userUuid: to.params.userUuid } });
        if (dossier.value.active === false) return next({ name: "recover-dossier", params: { userUuid: to.params.userUuid } });
        return next();
    }

    const response = await findDossierByUserUuid(to.params.userUuid as string);
    if (response === undefined) return next({ name: "register-dossier", params: { userUuid: to.params.userUuid } });
    setDossier(response)
    return next();
}