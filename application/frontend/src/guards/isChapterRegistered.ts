import { usePermission } from "@/composables/usePermission";
import { useChapter } from "@/stores/useChapter";
import { usePage } from "@/stores/usePage";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isChapterRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const parameterizedUserUuid = to.params.userUuid as string;
    const parameterizedDossierUuid = to.params.dossierUuid as string;
    const parameterizedBookUuid = to.params.bookUuid as string;
    const parameterizedChapterUuid = to.params.chapterUuid as string;

    const useChapterStore = useChapter();
    const usePageStore = usePage();
    const { chapters } = storeToRefs(useChapterStore);
    const { isProducer, isSubscriber } = usePermission();

    if (!parameterizedChapterUuid) return next({ name: "book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid } });

    const cachedChapter = chapters.value.find((chapter) => chapter.uuid === parameterizedChapterUuid);
    const isRecoverChapterRoute = computed(() => to.path.includes("recover-chapter"))

    if (cachedChapter) {
        if (isProducer.value && isRecoverChapterRoute.value) return next()
        if (isSubscriber.value && (!cachedChapter.active || !cachedChapter.visible)) return next({ name: "book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid } });
        if (isProducer.value && !cachedChapter.active) return next({ name: "recover-chapter", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: parameterizedBookUuid, chapterUuid: cachedChapter.uuid } })

        const foundPages = await usePageStore.findPagesByChapterUuid(cachedChapter.uuid)
        if (foundPages !== undefined) usePageStore.updateState(foundPages)
    }

    return next();
}