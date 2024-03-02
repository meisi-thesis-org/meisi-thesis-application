<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :header-content="route.meta.username + ' dossier'"  :icons="bannerIcons" :groups="bannerGroups"
                    :color="'light-colorized'" :is-editable="false" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Books'" :segment="'designation'" />
                        <Icon v-if="isProducer && isOwner" :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'"
                            :width="'1.25rem'" :on-click="createBook" />
                    </div>
                    <div id="wrapper__inner--content__box--books">
                        <Card v-for="book of books" v-show="isProducer || (isConsumer && book.active && book.visible)" :designation="book.designation" :description="book.description"
                        :is-visible="book.visible" :is-active="book.active" @click="navigateToBook(book.uuid)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import Card from "@/components/Card.vue";
import Icon from "@/components/Icon.vue";
import Navbar from "@/components/Navbar.vue"
import Typography from "@/components/Typography.vue";
import { useLoader } from "@/composables/useLoader";
import { usePermission } from "@/composables/usePermission";
import { useBook } from "@/stores/useBook";
import { useDossier } from "@/stores/useDossier";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BannerGroupProps } from "@/types/Banner";
import type { IconProps } from "@/types/Icon";
import type { Primitive } from "@/types/Primitive";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const useBookStore = useBook();
const useDossierStore = useDossier();
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { isLoading } = useLoader();
const { dossiers } = storeToRefs(useDossierStore);
const { books } = storeToRefs(useBookStore);
const { wallet } = storeToRefs(useWalletStore);
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { isProducer, isConsumer, isDossierSubscribed, isOwner } = usePermission();

const dossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === route.params.dossierUuid))

const isVisible = computed(() => {
    if (dossier.value === undefined) return false;
    return dossier.value && dossier.value.visible;
})

const isActive = computed(() => {
    if (dossier.value === undefined) return false;
    return dossier.value && dossier.value.active;
})

const bannerIcons = computed<Array<IconProps & { isVisible: boolean }>>(() => ([
    { name: 'lock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isDossierSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'watcher', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && !isVisible.value && isOwner.value), onClick: () => updateDossier({ visible: true }) },
    { name: 'watcher-off', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isVisible.value && isOwner.value), onClick: () => updateDossier({ visible: false }) },
    { name: 'trashcan', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isOwner.value), onClick: () => updateDossier({ active: false }) },
]))

const bannerGroups = computed<Array<BannerGroupProps>>(() => [
    { type: 'editableControl', content: dossier.value?.designation ?? '', contentType: 'text', maxLength: '60', color: "light-colorized", isEditable: isProducer.value && isOwner.value, onBlur: (designation: string) => updateDossier({ designation }) },
    { type: 'editableControl', content: dossier.value?.price ?? 0, contentType: 'number', designation: '', color: "light-colorized", isEditable: isProducer.value && isOwner.value, onBlur: (price: number) => updateDossier({ price }) },
])

const updateDossier = async (data: Record<string, Primitive>) => {
    try {
        isLoading.value = !isLoading.value;
        await useDossierStore.updateDossierByUuid(dossier.value!.uuid, data);
        if (!isActive.value) router.push({ name: "dashboard", params: { userUuid: route.params.userUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const createBook = async () => {
    try {
        isLoading.value = !isLoading.value;
        await useBookStore.createBook({
            dossierUuid: dossier.value!.uuid,
            designation: `Book #${books.value?.length}`,
            description: '',
            price: 0
        })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const toggleSubscription = async () => {
    try {
        isLoading.value = !isLoading.value;
        const foundSubscription = subscriptions.value.find((subscription) => subscription.dossierUuid === dossier.value?.uuid)
        if (!foundSubscription) await useSubscriptionStore.createSubscription({ walletUuid: wallet.value?.uuid, dossierUuid: dossier.value?.uuid });
        if (foundSubscription) await useSubscriptionStore.updateSubscriptionByUuid(foundSubscription.uuid, { active: !foundSubscription.active, visible: !foundSubscription.visible });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const navigateToBook = (bookUuid: string) => router.push({ name: 'book', params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: bookUuid } })
</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--content {
            &__box {
                padding: 2.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;

                &--row {
                    display: inherit;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                &--books {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
            }
        }
    }
}
</style>