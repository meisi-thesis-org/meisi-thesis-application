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
                        <SegmentedCard v-for="subscribedDossier of subscribedDossiers" :designation="subscribedDossier.designation" :description="'520'" />
                        <Typography :content="'Subscribed Books'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedBook of subscribedBooks" :designation="subscribedBook.designation" :description="'520'" />
                        <Typography :content="'Subscribed Chapters'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedChapter of subscribedChapters" :designation="subscribedChapter.designation" :description="'520'" />
                        <Typography :content="'Subscribed Pages'" :segment="'subHeader'" />
                        <SegmentedCard v-for="subscribedPage of subscribedPages" :designation="subscribedPage.designation" :description="'520'" />
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
import { useDossier } from "@/stores/useDossier";
import { useSession } from "@/stores/useSession";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BookEntity, ChapterEntity, DossierEntity, PageEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
const { subscriptions } = storeToRefs(useSubscription());
const { wallet } = storeToRefs(useWallet());
const { dossiers } = storeToRefs(useDossier());
const { session } = storeToRefs(useSession());
const subscribers = ref<number>(0);
const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === session.value?.userUuid));

const subscribedDossiers = ref<Array<DossierEntity>>();
const subscribedBooks = ref<Array<BookEntity>>();
const subscribedChapters = ref<Array<ChapterEntity>>();
const subscribedPages = ref<Array<PageEntity>>();

onMounted(async () => {})
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