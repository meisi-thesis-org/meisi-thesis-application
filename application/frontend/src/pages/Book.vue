<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :header-content="book?.designation ?? ''"  :icons="bannerIcons" :groups="bannerGroups"
                    :color="'light-colorized'" :is-editable="isProducer" :on-blur="(data: string) => updateBook({ designation: data })"  />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Chapters'" :segment="'designation'" />
                        <Icon v-if="isProducer" :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'"
                            :width="'1.25rem'" :on-click="createChapter" />
                    </div>
                    <Card v-for="chapter of chapters" @click="navigateToChapter(chapter.uuid)"
                        :designation="chapter.designation" :description="chapter.description" :is-visible="chapter.visible"
                        :is-active="chapter.active" />
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
import { useBook } from '@/stores/useBook';
import { useChapter } from "@/stores/useChapter";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePermission } from "@/composables/usePermission";
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BannerGroupProps } from "@/types/Banner";
import type { IconProps } from "@/types/Icon";

const route = useRoute();
const router = useRouter();
const useBookStore = useBook();
const useChapterStore = useChapter();
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { isLoading } = useLoader();
const { books } = storeToRefs(useBookStore);
const { chapters } = storeToRefs(useChapterStore);
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { wallet } = storeToRefs(useWalletStore);
const { isProducer, isConsumer, isSubscribed } = usePermission();

const book = computed(() => books.value.find((book) => book.uuid === route.params.bookUuid))

const bannerIcons = computed<Array<IconProps & { isVisible: boolean }>>(() => ([
    { name: 'lock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'unlock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && isSubscribed.value && isActive.value && isVisible.value), onClick: () => toggleSubscription() },
    { name: 'watcher', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && !isVisible.value), onClick: () => updateBook({ visible: true }) },
    { name: 'watcher-off', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isVisible.value), onClick: () => updateBook({ visible: false }) },
    { name: 'trashcan', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value), onClick: () => updateBook({ active: false }) },
]))
const bannerGroups = computed<Array<BannerGroupProps>>(() => [
    { type: 'editableControl', content: book.value?.description ?? '', contentType: 'text', maxLength: '60', color: "light-colorized", isEditable: isProducer.value, onBlur: (description: string) => updateBook({ description }) },
    { type: 'editableControl', content: book.value?.price ?? 0, contentType: 'number', designation: 'Fee: ', color: "light-colorized", isEditable: isProducer.value, onBlur: (price: number) => updateBook({ price }) },
])

const isVisible = computed(() => {
    if (book.value === undefined) return false;
    return book.value && book.value.visible;
})

const isActive = computed(() => {
    if (book.value === undefined) return false;
    return book.value && book.value.active;
})

const updateBook = async (data: Record<string, string | boolean | number>) => {
    try {
        isLoading.value = !isLoading.value;
        await useBookStore.updateBookByUuid(book.value!.uuid, data);
        if (!isActive.value) router.push({ name: "dossier", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
const createChapter = async () => {
    try {
        isLoading.value = !isLoading.value;
        await useChapterStore.createChapter({
            bookUuid: book.value!.uuid,
            designation: `Chapter #${chapters.value?.length}`,
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
        const foundSubscription = subscriptions.value.find((subscription) => subscription.bookUuid === book.value?.uuid)
        if (!foundSubscription) await useSubscriptionStore.createSubscription({ walletUuid: wallet.value?.uuid, bookUuid: book.value?.uuid });
        if (foundSubscription) await useSubscriptionStore.updateSubscriptionByUuid(foundSubscription.uuid, { active: !foundSubscription.active, visible: !foundSubscription.visible });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const navigateToChapter = (chapterUuid: string) => router.push({ name: 'chapter', params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: chapterUuid } })
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