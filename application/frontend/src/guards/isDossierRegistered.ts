import { useDossier } from "@/stores/useDossier";
import type { RouteLocation, NavigationGuardNext } from "vue-router";

export const isDossierRegistered = async (
    to: RouteLocation,
    from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { findDossierByUserUuid } = useDossier()
    if (to.params.userUuid === undefined) return next({ name: "dashboard" });
    const response = await findDossierByUserUuid(to.params.userUuid as string);
    if (response === undefined) return next({ name: "register-dossier" });
    return next();
}