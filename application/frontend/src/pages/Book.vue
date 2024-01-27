<template>
<div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner @editable-field-update="(data: string) => updateBook({ designation: data })"
                    @toggle-visibility="(data: boolean) => updateBook({ visible: data })"
                    @toggle-activity="(data: boolean) => updateBook({ active: data })" :is-content-enabled="isActive"
                    :is-content-visible="isVisible" :header-content="book?.designation!"
                    :sub-header-content="subHeaderContent" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Chapters'" :segment="'designation'" />
                        <Icon :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'" :width="'1.25rem'"
                            :on-click="createChapter" />
                    </div>
                    <Card v-for="chapter of chapters" @click="navigateToChapter(chapter.uuid)" :designation="chapter.designation" :description="chapter.description"
                        :is-visible="chapter.visible" :is-active="chapter.active" />
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

const route = useRoute();
const router = useRouter();
const useBookStore = useBook();
const useChapterStore = useChapter();
const { isLoading } = useLoader();
const { books } = storeToRefs(useBookStore);
const { chapters } = storeToRefs(useChapterStore);

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
        console.log(data)
        await useBookStore.updateBookByUuid(book.value!.uuid, data);
        if (!isActive.value) router.push({ name: "dossier", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
const createChapter = async () => {
    await useChapterStore.createChapter({
        bookUuid: book.value!.uuid,
        designation: `Chapter #${books.value?.length}`,
        description: '',
    })
}

const navigateToChapter = (chapterUuid: string) => router.push({ name: 'chapter', params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapter: chapterUuid } })
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