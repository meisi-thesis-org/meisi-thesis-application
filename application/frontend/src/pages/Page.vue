<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :is-content-enabled="isActive" :is-content-visible="isVisible"
                    :header-content="page?.designation!" :sub-header-content="subHeaderContent"
                    :is-header-editable="true"
                    @editable-control-update="(data: string) => updatePage({ designation: data })"
                    @editable-field-update="(data: string) => updatePage({ description: data })"
                    @toggle-visibility="(data: boolean) => updatePage({ visible: data })"
                    @toggle-activity="(data: boolean) => updatePage({ active: data })" />
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import Navbar from "@/components/Navbar.vue"
import { useLoader } from "@/composables/useLoader";
import { usePage } from "@/stores/usePage";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const usePageStore = usePage();
const { isLoading } = useLoader();
const { pages } = storeToRefs(usePageStore);

const page = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid))

const isVisible = computed(() => {
    if (page.value === undefined) return false;
    return page.value && page.value.visible;
})

const isActive = computed(() => {
    if (page.value === undefined) return false;
    return page.value && page.value.active;
})

const updatePage = async (data: Record<string, string | boolean>) => {
    try {
        isLoading.value = !isLoading.value;
        await usePageStore.updatePageByUuid(page.value!.uuid, data);
        if (!isActive.value) router.push({ name: "chapter", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: route.params.chapterUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const subHeaderContent = computed(() => page.value?.description ?? '')
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