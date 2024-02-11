<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :is-content-enabled="isActive" :is-content-visible="isVisible"
                    :header-content="chapter?.designation!" :sub-header-content="subHeaderContent"
                    :is-header-editable="true"
                    @editable-control-update="(data: string) => updateChapter({ designation: data })"
                    @editable-field-update="(data: string) => updateChapter({ description: data })"
                    @toggle-visibility="(data: boolean) => updateChapter({ visible: data })"
                    @toggle-activity="(data: boolean) => updateChapter({ active: data })" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Pages'" :segment="'designation'" />
                        <Icon v-if="isProducer" :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'" :width="'1.25rem'"
                            :on-click="createPage" />
                    </div>
                    <Card v-for="page of pages" 
                        :designation="page.designation" 
                        :description="page.description" 
                        :is-visible="page.visible"
                        :is-active="page.active" 
                        :show-description="false"
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

const route = useRoute();
const router = useRouter();
const useChapterStore = useChapter();
const usePageStore = usePage();
const { isLoading } = useLoader();
const { chapters } = storeToRefs(useChapterStore);
const { pages } = storeToRefs(usePageStore);
const { isProducer } = usePermission();

const chapter = computed(() => chapters.value.find((chapter) => chapter.uuid === route.params.chapterUuid))

const isVisible = computed(() => {
    if (chapter.value === undefined) return false;
    return chapter.value && chapter.value.visible;
})

const isActive = computed(() => {
    if (chapter.value === undefined) return false;
    return chapter.value && chapter.value.active;
})

const updateChapter = async (data: Record<string, string | boolean>) => {
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
    await usePageStore.createPage({
        chapterUuid: chapter.value!.uuid,
        designation: `Page #${pages.value?.length}`,
        description: '',
    })
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
const subHeaderContent = computed(() => chapter.value?.description ?? '')
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