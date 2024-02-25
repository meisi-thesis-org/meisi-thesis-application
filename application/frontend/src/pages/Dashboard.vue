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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import Navbar from "@/components/Navbar.vue"
import SegmentedCard from "@/components/SegmentedCard.vue";
import Typography from "@/components/Typography.vue";
import { useDossier } from "@/stores/useDossier";
import { useSession } from "@/stores/useSession";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
const useDossierStore = useDossier();
const { subscriptions } = storeToRefs(useSubscription());
const { wallet } = storeToRefs(useWallet());
const { dossiers } = storeToRefs(useDossierStore);
const { session } = storeToRefs(useSession());
const subscribers = ref<number>(0);
const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === session.value?.userUuid));
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