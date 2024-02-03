import { usePermission } from "@/composables/usePermission";
import { useChapter } from "@/stores/useChapter";
import { usePage } from "@/stores/usePage";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isPageRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const parameterizedUserUuid = to.params.userUuid as string;
    const parameterizedDossierUuid = to.params.dossierUuid as string;
    const parameterizedBookUuid = to.params.bookUuid as string;
    const parameterizedChapterUuid = to.params.chapterUuid as string;
    const parameterizedPageUuid = to.params.pageUuid as string;

    const usePageStore = usePage();
    const { pages } = storeToRefs(usePageStore);
    const { isOwner } = usePermission();

    if (!parameterizedChapterUuid) return next({ name: "book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid } });

    const createdPage = pages.value.find((page) => page.uuid === parameterizedPageUuid);

    if (createdPage) {
        if (!isOwner(parameterizedUserUuid) && (!createdPage.active || !createdPage.visible)) return next({ name: "chapter", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid, chapterUuid: parameterizedChapterUuid } });
        if (isOwner(parameterizedUserUuid) && !createdPage.active) return next({ name: "recover-page", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid, chapterUuid: createdPage.uuid } })
    }

    return next();
}