<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--sections">
                <div id="wrapper__inner--sections__wallet">
                    <Typography :content="'Wallet'" :segment="'designation'" />
                    <div id="wrapper__inner--sections__wallet--cards">
                        <SegmentedCard :designation="'E-Bookler Points'" :description="String(wallet?.funds ?? 0)" />
                        <SegmentedCard :designation="'Subscriptions'" :description="String(subscriptions.length ?? 0)" />
                        <SegmentedCard v-if="dossier" :designation="'Subscribers'" :description="String(subscribers)" />
                    </div>
                </div>
                <div id="wrapper__inner--sections__content">
                    <div id="wrapper__inner--sections__content--subscriptions">
                        <Typography :content="'Subscribed Dossiers'" :segment="'designation'" />
                        <Card v-for="subscribedDossier of subscribedDossiers"
                            @click="navigateToDossier(subscribedDossier.uuid)" 
                            :designation="subscribedDossier.designation"
                            :description="''" 
                            :is-visible="subscribedDossier.visible"
                            :is-active="subscribedDossier.active" />
                        <Typography :content="'Subscribed Books'" :segment="'designation'" />
                        <Card v-for="subscribedBook of subscribedBooks"
                            @click="navigateToBook(subscribedBook.uuid)" 
                            :designation="subscribedBook.designation"
                            :description="subscribedBook.description" 
                            :is-visible="subscribedBook.visible"
                            :is-active="subscribedBook.active" />
                        <Typography :content="'Subscribed Chapters'" :segment="'designation'" />
                        <Card v-for="subscribedChapter of subscribedChapters"
                            @click="navigateToChapter(subscribedChapter.uuid)" 
                            :designation="subscribedChapter.designation"
                            :description="subscribedChapter.description" 
                            :is-visible="subscribedChapter.visible"
                            :is-active="subscribedChapter.active" />
                        <Typography :content="'Subscribed Pages'" :segment="'designation'" />
                        <Card v-for="subscribedPage of subscribedPages"
                            @click="navigateToChapter(subscribedPage.uuid)" 
                            :designation="subscribedPage.designation"
                            :description="subscribedPage.description" 
                            :is-visible="subscribedPage.visible"
                            :is-active="subscribedPage.active" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import Navbar from "@/components/Navbar.vue"
import SegmentedCard from "@/components/SegmentedCard.vue";
import Typography from "@/components/Typography.vue";
import { useBook } from "@/stores/useBook";
import { useChapter } from "@/stores/useChapter";
import { useDossier } from "@/stores/useDossier";
import { usePage } from "@/stores/usePage";
import { useSession } from "@/stores/useSession";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BookEntity, ChapterEntity, DossierEntity, PageEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
const useDossierStore = useDossier();
const useBookStore = useBook();
const useChapterStore = useChapter();
const usePageStore = usePage();
const { subscriptions } = storeToRefs(useSubscription());
const { wallet } = storeToRefs(useWallet());
const { dossiers } = storeToRefs(useDossierStore);
const { session } = storeToRefs(useSession());
const subscribers = ref<number>(0);
const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === session.value?.userUuid));
const subscribedDossiers = ref<Array<DossierEntity>>([]);
const subscribedBooks = ref<Array<BookEntity>>([]);
const subscribedChapters = ref<Array<ChapterEntity>>([]);
const subscribedPages = ref<Array<PageEntity>>([]);

onMounted(async () => {
    const dossiersByQuery = await useDossierStore.findDossierByQuery();
    const booksByQuery = await useBookStore.findBooksByQuery();
    const chaptersByQuery = await useChapterStore.findChaptersByQuery();
    const pagesByQuery = await usePageStore.findPagesByQuery();

    for (const subscription of subscriptions.value) {
        subscribedDossiers.value.push(...dossiersByQuery.filter((dossierByQuery) => dossierByQuery.uuid === subscription.dossierUuid));
        subscribedBooks.value.push(...booksByQuery.filter((bookByQuery) => bookByQuery.uuid === subscription.bookUuid));
        subscribedChapters.value.push(...chaptersByQuery.filter((chapterByQuery) => chapterByQuery.uuid === subscription.chapterUuid));
        subscribedPages.value.push(...pagesByQuery.filter((pageByQuery) => pageByQuery.uuid === subscription.pageUuid));
    }
})

const navigateToDossier = (dossierUuid: string) => {};
const navigateToBook = (bookUuid: string) => {};
const navigateToChapter = (chapterUuid: string) => {};
const navigateToPage = (pageUuid: string) => {};
</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--sections {
            padding: 1.5rem;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &__wallet {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;

                &--cards {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }
            }
        }
    }
}
</style>