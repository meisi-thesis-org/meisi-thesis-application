<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :header-content="chapter?.designation ?? ''"  :icons="bannerIcons" :groups="bannerGroups"
                    :color="'light-colorized'" :is-editable="isProducer" :on-blur="(data: string) => updateChapter({ designation: data })" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Pages'" :segment="'designation'" />
                        <Icon v-if="isProducer" :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'"
                            :width="'1.25rem'" :on-click="createPage" />
                    </div>
                    <Card v-for="page of pages" :designation="page.designation" :description="page.description"
                        :is-visible="page.visible" :is-active="page.active" :show-description="false"
                        @click="navigateToPage(page.uuid)" />
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import Icon from "@/components/Icon.vue";
import Navbar from "@/components/Navbar.vue"
import Card from "@/components/Card.vue"
import Typography from "@/components/Typography.vue";
import { useLoader } from "@/composables/useLoader";
import { useChapter } from "@/stores/useChapter";
import { usePage } from "@/stores/usePage";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePermission } from "@/composables/usePermission";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { IconProps } from "@/types/Icon";
import type { BannerGroupProps } from "@/types/Banner";

const route = useRoute();
const router = useRouter();
const useChapterStore = useChapter();
const usePageStore = usePage();
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { isLoading } = useLoader();
const { chapters } = storeToRefs(useChapterStore);
const { pages } = storeToRefs(usePageStore);
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { wallet } = storeToRefs(useWalletStore);
const { isProducer, isConsumer, isDossierSubscribed, isBookSubscribed, isChapterSubscribed } = usePermission();

const chapter = computed(() => chapters.value.find((chapter) => chapter.uuid === route.params.chapterUuid))

const bannerIcons = computed<Array<IconProps & { isVisible: boolean }>>(() => ([
    { name: 'lock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isDossierSubscribed.value && !isBookSubscribed.value && !isChapterSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'watcher', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && !isVisible.value), onClick: () => updateChapter({ visible: true }) },
    { name: 'watcher-off', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isVisible.value), onClick: () => updateChapter({ visible: false }) },
    { name: 'trashcan', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value), onClick: () => updateChapter({ active: false }) },
]))

const bannerGroups = computed<Array<BannerGroupProps>>(() => [
    { type: 'editableControl', content: chapter.value?.description ?? '', contentType: 'text', maxLength: '60', color: "light-colorized", isEditable: isProducer.value, onBlur: (description: string) => updateChapter({ description }) },
    { type: 'editableControl', content: chapter.value?.price ?? 0, contentType: 'number', designation: 'Fee: ', color: "light-colorized", isEditable: isProducer.value, onBlur: (price: number) => updateChapter({ price }) },
])

const isVisible = computed(() => {
    if (chapter.value === undefined) return false;
    return chapter.value && chapter.value.visible;
})

const isActive = computed(() => {
    if (chapter.value === undefined) return false;
    return chapter.value && chapter.value.active;
})

const updateChapter = async (data: Record<string, string | boolean | number>) => {
    try {
        isLoading.value = !isLoading.value;
        await useChapterStore.updateChapterByUuid(chapter.value!.uuid, data);
        if (!isActive.value) router.push({ name: "book", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
const createPage = async () => {
    try {
        isLoading.value = !isLoading.value;
        await usePageStore.createPage({
            chapterUuid: chapter.value!.uuid,
            designation: `Page #${pages.value?.length}`,
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
        const foundSubscription = subscriptions.value.find((subscription) => subscription.chapterUuid === chapter.value?.uuid)
        if (!foundSubscription) await useSubscriptionStore.createSubscription({ walletUuid: wallet.value?.uuid, chapterUuid: chapter.value?.uuid });
        if (foundSubscription) await useSubscriptionStore.updateSubscriptionByUuid(foundSubscription.uuid, { active: !foundSubscription.active, visible: !foundSubscription.visible });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const navigateToPage = (pageUuid: string) => router.push({
    name: 'page',
    params: {
        userUuid: route.params.userUuid,
        dossierUuid: route.params.dossierUuid,
        bookUuid: route.params.bookUuid,
        chapterUuid: route.params.chapterUuid,
        pageUuid: pageUuid
    }
})
</script>
    
<style scoped lang="scss">
#wrapper {
    &__inner {
        &--content {
            &__box {
                padding: 2.5rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;

                &--row {
                    display: inherit;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
}
</style>