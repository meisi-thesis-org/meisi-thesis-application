import { usePermission } from "@/composables/usePermission";
import { useBook } from "@/stores/useBook";
import { useChapter } from "@/stores/useChapter";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isBookRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const parameterizedUserUuid = to.params.userUuid as string;
    const parameterizedDossierUuid = to.params.dossierUuid as string;
    const parameterizedBookUuid = to.params.bookUuid as string;
    const parameterizedChapterUuid = to.params.chapterUuid as string;

    const useChapterStore = useChapter();
    // const usePageStore = usePage();
    const { chapters } = storeToRefs(useChapterStore);
    const { isOwner } = usePermission();

    if (!parameterizedChapterUuid) return next({ name: "book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid } });

    const cachedChapter = chapters.value.find((chapter) => chapter.uuid === parameterizedChapterUuid);

    if(cachedChapter) {
        if (!isOwner(parameterizedUserUuid) && (!cachedChapter.active || !cachedChapter.visible)) return next({ name: "book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid } });
        if (isOwner(parameterizedUserUuid) && !cachedChapter.active) return next({ name: "recover-chapter", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid, chapterUuid: cachedChapter.uuid } })

        // const foundChapters = await usePagesStore.findChaptersByBookUuid(cachedChapter.uuid)
        // if(foundChapters !== undefined) useChapterStore.updateState(foundChapters)
        return next();
    }

    return next();
}