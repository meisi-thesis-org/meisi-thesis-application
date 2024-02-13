<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner 
                    :is-content-enabled="isActive" 
                    :is-content-visible="isVisible" 
                    :header-content="book?.designation!"
                    :sub-header-content="subHeaderContent" :is-header-editable="true"
                    @editable-control-update="(data: string) => updateBook({ designation: data })"
                    @editable-field-update="(data: string) => updateBook({ description: data })"
                    @toggle-visibility="(data: boolean) => updateBook({ visible: data })"
                    @toggle-activity="(data: boolean) => updateBook({ active: data })" 
                    @toggle-lock="() => toggleSubscription()"/>
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
const { isProducer } = usePermission();

const book = computed(() => books.value.find((book) => book.uuid === route.params.bookUuid))

const subHeaderContent = computed(() => book.value?.description ?? '')

const isVisible = computed(() => {
    if (book.value === undefined) return false;
    return book.value && book.value.visible;
})

const isActive = computed(() => {
    if (book.value === undefined) return false;
    return book.value && book.value.active;
})

const updateBook = async (data: Record<string, string | boolean>) => {
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