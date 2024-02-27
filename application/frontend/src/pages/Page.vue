<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :header-content="page?.designation ?? ''"  :icons="bannerIcons" :groups="bannerGroups"
                    :color="'light-colorized'" :is-editable="isProducer" :on-blur="(data: string) => updatePage({ designation: data })" />
                <EditableField :content="subHeaderContent" :max-length="'1500'" :is-editable="isProducer"
                    @on-blur="(data: string) => updatePage({ description: data })" />
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import EditableField from "@/components/EditableField.vue";
import Navbar from "@/components/Navbar.vue"
import { useLoader } from "@/composables/useLoader";
import { usePermission } from "@/composables/usePermission";
import { usePage } from "@/stores/usePage";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BannerGroupProps } from "@/types/Banner";
import type { IconProps } from "@/types/Icon";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const usePageStore = usePage();
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { isLoading } = useLoader();
const { pages } = storeToRefs(usePageStore);
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { wallet } = storeToRefs(useWalletStore);
const { isProducer, isConsumer, isDossierSubscribed, isBookSubscribed, isChapterSubscribed, isPageSubscribed } = usePermission();

const page = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid))
const isVisible = computed(() => (page.value && page.value.visible) ?? false)
const isActive = computed(() => (page.value && page.value.active) ?? false)
const subHeaderContent = computed(() => page.value?.description ?? '')

const bannerIcons = computed<Array<IconProps & { isVisible: boolean }>>(() => ([
    { name: 'lock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isDossierSubscribed.value && !isBookSubscribed.value && !isChapterSubscribed.value && !isPageSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'unlock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isDossierSubscribed.value && !isBookSubscribed.value && !isChapterSubscribed.value && isPageSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'watcher', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && !isVisible.value), onClick: () => updatePage({ visible: true }) },
    { name: 'watcher-off', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isVisible.value), onClick: () => updatePage({ visible: false }) },
    { name: 'trashcan', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value), onClick: () => updatePage({ active: false }) },
]))

const bannerGroups = computed<Array<BannerGroupProps>>(() => [
    { type: 'editableControl', content: page.value?.price ?? 0, contentType: 'number', designation: 'Fee: ', color: "light-colorized", isEditable: isProducer.value, onBlur: (price: number) => updatePage({ price }) },
])

const updatePage = async (data: Record<string, string | boolean | number>) => {
    try {
        isLoading.value = !isLoading.value;
        await usePageStore.updatePageByUuid(page.value!.uuid, data);
        if (!isActive.value) router.push({ name: "chapter", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: route.params.chapterUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const toggleSubscription = async () => {
    try {
        isLoading.value = !isLoading.value;
        const foundSubscription = subscriptions.value.find((subscription) => subscription.pageUuid === page.value?.uuid)
        if (!foundSubscription) await useSubscriptionStore.createSubscription({ walletUuid: wallet.value?.uuid, pageUuid: page.value?.uuid });
        if (foundSubscription) await useSubscriptionStore.updateSubscriptionByUuid(foundSubscription.uuid, { active: !foundSubscription.active, visible: !foundSubscription.visible });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

</script>
    
<style scoped lang="scss">
#wrapper {
    &__inner {
        &--content {
            textarea {
                padding: 1.5rem;
                height: 30rem;
            }
        }
    }
}
</style>