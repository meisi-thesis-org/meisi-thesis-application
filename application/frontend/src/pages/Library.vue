<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--sections">
                <div id="wrapper__inner--sections__content">
                    <div id="wrapper__inner--sections__content--cards">
                        <Typography :content="'Dossiers'" :segment="'designation'" />
                        <Card v-for="dossier of dossiers" @click="navigateToDossier(dossier.uuid)"
                            :designation="`Dossier: ${dossier.uuid}`" :description="dossier.designation"
                            :is-visible="dossier.visible" :is-active="dossier.active" />
                    </div>
                    <div id="wrapper__inner--sections__content--cards">
                        <Typography :content="'Books'" :segment="'designation'" />
                        <Card v-for="book of books" @click="navigateToBook(book.uuid)"
                            :designation="`Book: ${book.designation}`" :description="book.description"
                            :is-visible="book.visible" :is-active="book.active" />
                    </div>
                    <div id="wrapper__inner--sections__content--cards">
                        <Typography :content="'Chapters'" :segment="'designation'" />
                        <Card v-for="chapter of chapters" @click="navigateToChapter(chapter.uuid)"
                            :designation="`Chapter: ${chapter.designation}`" :description="chapter.description"
                            :is-visible="chapter.visible" :is-active="chapter.active" />
                    </div>
                    <div id="wrapper__inner--sections__content--cards">
                        <Typography :content="' Pages'" :segment="'designation'" />
                        <Card v-for="page of pages" @click="navigateToPage(page.uuid)"
                            :designation="`Page: ${page.designation}`" :description="page.description"
                            :is-visible="page.visible" :is-active="page.active" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import Navbar from "@/components/Navbar.vue"
import Typography from "@/components/Typography.vue";

import { useLoader } from '@/composables/useLoader';
import { useBook } from '@/stores/useBook';
import { useChapter } from '@/stores/useChapter';
import { useDossier } from '@/stores/useDossier';
import { usePage } from '@/stores/usePage';
import { useSession } from '@/stores/useSession';
import type { BookEntity, ChapterEntity, DossierEntity, PageEntity } from '@/types/Entities';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { findDossiersByQuery } = useDossier();
const { findBooksByQuery } = useBook();
const { findChaptersByQuery } = useChapter();
const { findPagesByQuery } = usePage();
const { isLoading } = useLoader();
const { push } = useRouter();
const { session } = storeToRefs(useSession());

const dossiers = ref<Array<DossierEntity>>();
const books = ref<Array<BookEntity>>();
const chapters = ref<Array<ChapterEntity>>();
const pages = ref<Array<PageEntity>>();

const findDossierById = (dossierUuid: string) => dossiers.value?.find((dossier) => dossier.uuid === dossierUuid)
const findBookById = (bookUuid: string) => books.value?.find((book) => book.uuid === bookUuid)
const findChapterById = (chapterUuid: string) => chapters.value?.find((chapter) => chapter.uuid === chapterUuid)
const findPageById = (chapterUuid: string) => pages.value?.find((page) => page.uuid === chapterUuid)

const navigateToDossier = (dossierUuid: string) => push({ name: "dossier", params: { userUuid: session.value?.userUuid, dossierUuid } });

const navigateToBook = (bookUuid: string) => {
    const book = findBookById(bookUuid);
    return push({ name: "book", params: { userUuid: session.value?.userUuid, dossierUuid: book?.dossierUuid, bookUuid } })
};

const navigateToChapter = (chapterUuid: string) => {
    const chapter = findChapterById(chapterUuid);
    const book = findBookById(chapter?.bookUuid ?? '');
    return push({ name: "chapter", params: { userUuid: session.value?.userUuid, dossierUuid: book?.dossierUuid, bookUuid: book?.uuid, chapterUuid: chapter?.uuid } });
};

const navigateToPage = (pageUuid: string) => {
    const page = findPageById(pageUuid);
    const chapter = findChapterById(page?.chapterUuid ?? '');
    const book = findBookById(chapter?.bookUuid ?? '');
    return push({ name: "page", params: { userUuid: session.value?.userUuid, dossierUuid: book?.dossierUuid, bookUuid: book?.uuid, chapterUuid: chapter?.uuid, pageUuid: page?.uuid } });
}


onMounted(async () => {
    isLoading.value = true;
    dossiers.value = (await findDossiersByQuery()).filter((dossier) => {
        return dossier.userUuid !== session.value?.userUuid && dossier.active === true && dossier.visible === true;
    });
    books.value = (await findBooksByQuery()).filter((book) => {
        const dossier = findDossierById(book.dossierUuid);
        return dossier?.userUuid !== session.value?.userUuid && dossier?.active === true && dossier?.visible === true && book.active === true && book.visible === true;
    });
    chapters.value = (await findChaptersByQuery()).filter((chapter) => {
        const book = findBookById(chapter.bookUuid);
        const dossier = findDossierById(book?.dossierUuid ?? '');
        return dossier?.userUuid !== session.value?.userUuid && dossier?.active === true && dossier?.visible === true && book?.active === true && book?.visible === true && chapter.active === true && chapter.visible === true;
    });
    pages.value = (await findPagesByQuery()).filter((page) => {
        const chapter = findChapterById(page?.chapterUuid ?? '');
        const book = findBookById(chapter?.bookUuid ?? '');
        const dossier = findDossierById(book?.dossierUuid ?? '');
        return dossier?.userUuid !== session.value?.userUuid && dossier?.visible === true && book?.active === true && book?.visible === true && chapter?.active === true && chapter?.visible === true && page.active === true && page.visible === true;
    });
    isLoading.value = false;
})

</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--sections {
            padding: 1.5rem;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &__content {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;

                &--cards {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        }
    }
}
</style>