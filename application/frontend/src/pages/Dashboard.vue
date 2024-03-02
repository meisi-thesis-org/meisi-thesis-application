<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--sections">
                <div id="wrapper__inner--sections__wallet">
                    <Typography :content="'Wallet'" :segment="'designation'" />
                    <div id="wrapper__inner--sections__wallet--cards">
                        <SegmentedCard :designation="'E-Bookler Points'" :description="funds" />
                        <SegmentedCard :designation="'Subscriptions'" :description="String(subscriptions.length ?? 0)" />
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
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { wallet } = storeToRefs(useWalletStore);
const funds = computed(() => String(wallet.value?.funds ?? 0));
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