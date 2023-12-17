import { useAuthentication } from "@/composables/useAuthentication";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const useAuthenticationGuard = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const { isAuthenticated } = useAuthentication()
    
    if (!isAuthenticated() && to.meta.requiresSession) return next({ name: "access-account" });
    if (isAuthenticated() && !to.meta.requiresSession) return next({ name: "dashboard" });

    return next();
}