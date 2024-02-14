<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--sections">
                <div id="wrapper__inner--sections__wallet">
                    <Typography :content="'Wallet'" :segment="'subHeader'" />
                    <div id="wrapper__inner--sections__wallet--cards">
                        <SegmentedCard :designation="'E-Bookler Points'" :description="String(wallet?.funds ?? 0)" />
                        <SegmentedCard :designation="'Subscriptions'" :description="String(subscriptions.length ?? 0)" />
                        <SegmentedCard v-if="dossier" :designation="'Subscribers'" :description="String(subscribers)" />
                    </div>
                </div>
                <div id="wrapper__inner--sections__content">
                    <div id="wrapper__inner--sections__content--subscriptions">
                        <Typography :content="'Subscribed Dossiers'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedDossier of subscribedDossiers"
                            :designation="subscribedDossier?.designation ?? ''" :description="'520'" />
                        <Typography :content="'Subscribed Books'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedBook of subscribedBooks" :designation="subscribedBook?.designation  ?? ''"
                            :description="'520'" />
                        <Typography :content="'Subscribed Chapters'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedChapter of subscribedChapters"
                            :designation="subscribedChapter?.designation ?? ''" :description="'520'" />
                        <Typography :content="'Subscribed Pages'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedPage of subscribedPages" :designation="subscribedPage?.designation  ?? ''"
                            :description="'520'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import SegmentedCard from "@/components/SegmentedCard.vue";
import Typography from "@/components/Typography.vue";
import { useLoader } from "@/composables/useLoader";
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
const { isLoading } = useLoader();
const subscribers = ref<number>(0);
const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === session.value?.userUuid));

const subscribedDossiers = ref<Array<DossierEntity | undefined>>();
const subscribedBooks = ref<Array<BookEntity | undefined>>();
const subscribedChapters = ref<Array<ChapterEntity | undefined>>();
const subscribedPages = ref<Array<PageEntity | undefined>>();

onMounted(async () => {
    isLoading.value = !isLoading.value;
    const subscriptionDossiers = subscriptions.value.filter((subscription) => subscription.dossierUuid !== undefined)
    const subscriptionBooks = subscriptions.value.filter((subscription) => subscription.bookUuid !== undefined)
    const subscriptionChapters = subscriptions.value.filter((subscription) => subscription.chapterUuid !== undefined)
    const subscriptionPages = subscriptions.value.filter((subscription) => subscription.pageUuid !== undefined)

    subscriptionDossiers.forEach(async (subscriptionDossier) => subscribedDossiers.value?.push())
    subscriptionBooks.forEach(async (subscriptionBook) => subscribedBooks.value?.push(await useBookStore.findBookByUuid(subscriptionBook.uuid)))
    subscriptionChapters.forEach(async (subscriptionChapter) => subscribedChapters.value?.push(await useChapterStore.findChapterByUuid(subscriptionChapter.uuid)))
    subscriptionPages.forEach(async (subscriptionPage) => subscribedPages.value?.push(await usePageStore.findPageByUuid(subscriptionPage.uuid)))
    isLoading.value = !isLoading.value;

    console.log(subscribedDossiers.value)
    console.log(subscribedBooks.value)
    console.log(subscribedChapters.value)
    console.log(subscribedPages.value)
})
</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--sections {
            padding: 2.5rem;

            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &__wallet {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;

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