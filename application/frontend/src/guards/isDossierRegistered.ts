import { useDossier } from "@/stores/useDossier";
import { storeToRefs } from "pinia";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { setDossier, findDossierByUserUuid } = useDossier()
    const { dossier } = storeToRefs(useDossier())
    if (dossier.value !== undefined) return next();
    if (to.params.userUuid === undefined) return next({ name: "dashboard" });
    const response = await findDossierByUserUuid(to.params.userUuid as string);
    if (response === undefined) return next({ name: "register-dossier" });
    setDossier(response)
    return next();
}