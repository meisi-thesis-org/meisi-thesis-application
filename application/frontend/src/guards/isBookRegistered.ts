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
    const useBookStore = useBook();
    const { isOwner } = usePermission();
    const useChapterStore = useChapter();
    const { books } = storeToRefs(useBookStore);

    if (!parameterizedBookUuid) return next({ name: "dossier", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid } });
    const cachedBook = books.value.find((book) => book.uuid === parameterizedBookUuid);

    if (cachedBook) {
        if (!isOwner(parameterizedUserUuid) && (!cachedBook.active || !cachedBook.visible)) return next({ name: "dossier", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid } });
        if (isOwner(parameterizedUserUuid) && !cachedBook.active) return next({ name: "recover-book", params: { userUuid: parameterizedUserUuid, dossierUuid: parameterizedDossierUuid, bookUuid: cachedBook.uuid } })

        const foundChapters = await useChapterStore.findChaptersByBookUuid(cachedBook.uuid)
        if (foundChapters !== undefined) useChapterStore.updateState(foundChapters)
        return next();
    }

    return next();
}