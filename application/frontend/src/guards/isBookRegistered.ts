import { usePermission } from "@/composables/usePermission";
import { useBook } from "@/stores/useBook";
import { useChapter } from "@/stores/useChapter";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isBookRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const parameterizedUserUuid = to.params.userUuid as string;
    const parameterizedDossierUuid = to.params.dossierUuid as string;
    const parameterizedBookUuid = to.params.bookUuid as string;
    const useBookStore = useBook();
    const { isProducer, isConsumer } = usePermission(to);
    const useChapterStore = useChapter();
    const { books } = storeToRefs(useBookStore);

    if (!parameterizedBookUuid) return next({ name: "dossier", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid } });
    const cachedBook = books.value.find((book) => book.uuid === parameterizedBookUuid);

    const findChapters = async (bookUuid: string) => {
        const foundChapters = await useChapterStore.findChaptersByBookUuid(bookUuid)
        if (foundChapters !== undefined) useChapterStore.updateState(foundChapters)
    }

    const isRecoverBookPath = computed(() => to.path.includes("recover-book"))

    if (cachedBook) {
        if (isProducer.value && isRecoverBookPath.value) return next()
        if (isConsumer.value && (!cachedBook.active || !cachedBook.visible)) return next({ name: "dossier", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid } });
        if (isProducer.value && !cachedBook.active) return next({ name: "recover-book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: cachedBook.uuid } })
        await findChapters(cachedBook.uuid)
        return next();
    }

    return next();
}